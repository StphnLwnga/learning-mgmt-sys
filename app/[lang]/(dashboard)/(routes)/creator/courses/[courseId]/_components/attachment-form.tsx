"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import axios from 'axios';
import { File, Loader2, PlusCircle, X } from 'lucide-react';
import { CaretSortIcon } from "@radix-ui/react-icons"
import { useTheme } from 'next-themes';
import { Attachment, Course } from '@prisma/client';

import { cn } from "@/lib/utils";

import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import FileUpload from '@/components/file-upload';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";


interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
  userId: string;
}

const formSchema = z.object({
  url: z.string().min(1)
});

/**
 * Renders a form for managing course images.
 *
 * @param {AttachmentFormProps} initialData - The initial data for the form.
 * @param {string} courseId - The ID of the course.
 * @param {string} userId - The ID of the user.
 * @return {JSX.Element} The rendered form component.
 */
const AttachmentForm = ({ initialData, courseId, userId }: AttachmentFormProps): JSX.Element => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const { resolvedTheme } = useTheme();

  const [toBeDeletedId, setToBeDeletedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(true);

  const toggleEdit = () => setIsEditing(current => !current);

  const { toast } = useToast();

  const reset = () => router.refresh();

  /**
   * Submits the form data to the server and handles success and error cases.
   *
   * @param {z.infer<typeof formSchema>} data - The data to be submitted.
   * @return {Promise<void>} A promise that resolves when the submission is complete.
   */
  const onSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, data);
      toast({
        title: 'Success',
        description: "Resource successfully added!",
        className: `${resolvedTheme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-500 text-slate-100'} border-0 border-slate-200`,
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log("[COURSEID_ATT_ADD]", error);
      toast({
        title: 'Error',
        description: "Something went wrong!",
        variant: 'destructive',
        action: <ToastAction onClick={reset} altText="Try again">Try again</ToastAction>,
      });
    }
  }

  /**
   * Deletes an attachment with the specified attachment ID.
   *
   * @param {string} attachmentId - The ID of the attachment to be deleted.
   * @return {Promise<void>} - A promise that resolves when the attachment is successfully deleted.
   */
  const onDeleteAttachment = async (attachmentId: string): Promise<void> => {
    setLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}/attachments/${attachmentId}`);
      toast({
        title: 'Attachment Deleted',
        description: "Attachment deleted successfully!",
        className: `${resolvedTheme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-500 text-slate-100'} border-0 border-slate-200`,
      });
      router.refresh();
    } catch (error) {
      console.log("[COURSEID_ATT_DEL]", error);
      toast({
        title: 'Error',
        description: "Failed to delete attachment!",
        variant: 'destructive',
        action: <ToastAction onClick={reset} altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
      setToBeDeletedId(null);
    }
  }

  useEffect(() => {
    if (toBeDeletedId) onDeleteAttachment(toBeDeletedId);
  }, [toBeDeletedId]);

  return (
    <div className={cn(
      "mt-6 border bg-slate-100 rounded-md p-4",
      resolvedTheme === 'dark' && "bg-sky-300/30"
    )}>
      <div className="font-medium flex items-center justify-between">
        Course Resources
        {userId === initialData?.userId && (
          <Button variant="ghost" onClick={toggleEdit}
            size={isEditing ? "icon" : undefined}
            className={cn(
              isEditing && "rounded-full",
              resolvedTheme !== 'dark' && "hover:bg-slate-400",
            )}
          >
            {!isEditing
              ? (<>Add a file <PlusCircle className='h-4 w-4 ml-2' /></>)
              : (<X className='h-4 w-4' />)
            }
          </Button>
        )}
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0
            ? (<p className={cn("text-sm mt-2 italic text-slate-500", resolvedTheme === 'dark' && "text-slate-400")}>
              No attachments
            </p>)
            : (<Collapsible open={collapsibleOpen}>
              <CollapsibleTrigger className='w-full' onClick={() => setCollapsibleOpen(!collapsibleOpen)}>
                <div className={cn(
                  "flex items-center justify-between space-x-4 pr-3 pl-0 w-full text-sm mt-2 text-slate-700 py-2",
                  resolvedTheme === 'dark' && "text-slate-300"
                )}>
                  {`${initialData.attachments.length} attachment${initialData.attachments.length > 1 ? 's' : ''}`}
                  <CaretSortIcon className="h-5 w-5" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {initialData.attachments.length > 0 && initialData.attachments.map(attachment => (
                  <div key={attachment.id} className={cn(
                    "flex items-center p-2 w-full text-sm bg-sky-100 border-sky-200 text-sky-700 rounded-md my-4",
                    resolvedTheme === 'dark' && ""
                  )}
                  >
                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className='text-xs line-clamp-1'>
                      {attachment.name}
                    </p>
                    {attachment.id === toBeDeletedId && loading
                      ? (<div className='ml-auto'>
                        <Loader2 className='h-4 w-4 animate-spin' />
                      </div>)
                      : (<Button variant="ghost" size="icon"
                        className='ml-auto hover:opacity-75 transition rounded-full'
                        onClick={() => setToBeDeletedId(attachment.id)}
                      >
                        <X className='h-4 w-4 ' />
                      </Button>)
                    }
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>)
          }
        </>
      )}
      {isEditing &&
        (<div>
          <FileUpload
            endpoint='courseAttachment'
            onChange={url => {
              if (url) onSubmit({ url });
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload supplementary course resources
          </div>
        </div>)
      }
    </div>
  );
}

export default AttachmentForm;