"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import axios from 'axios';
import { ImageIcon, Pencil, PlusCircle, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Course } from '@prisma/client';
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import FileUpload from '@/components/file-upload';


interface ImageFormProps {
  initialData: Course;
  courseId: string;
  userId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required,'
  })
});

/**
 * Renders a form for managing course images.
 *
 * @param {ImageFormProps} initialData - The initial data for the form.
 * @param {string} courseId - The ID of the course.
 * @return {JSX.Element} The rendered form component.
 */
const ImageForm = ({ initialData, courseId, userId }: ImageFormProps): JSX.Element => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const { resolvedTheme } = useTheme();

  const toggleEdit = () => setIsEditing(current => !current);

  const { toast } = useToast();

  const reset = () => {
    // setIsEditing(false)
    router.refresh();
  }

  /**
   * Submits the form data to the API endpoint for updating a course.
   *
   * @param {z.infer<typeof formSchema>} data - The form data to be submitted.
   * @return {Promise<void>} A promise that resolves when the update is successful.
   */
  const onSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    try {
      await axios.patch(`/api/courses/${courseId}`, data);
      toast({
        title: 'Success',
        description: "Image successfully uploaded!",
        className: `${resolvedTheme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-500 text-slate-100'} border-0 border-slate-200`,
      });
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log("[COURSEID]", error);
      toast({
        title: 'Error',
        description: "Something went wrong!",
        variant: 'destructive',
        action: <ToastAction onClick={reset} altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <div className={cn(
      "mt-6 border bg-slate-100 rounded-md p-4",
      resolvedTheme === 'dark' && "bg-sky-300/30"
    )}>
      <div className="font-medium flex items-center justify-between">
        Course Image
        {userId === initialData?.userId && (<Button
          variant="ghost"
          onClick={toggleEdit}
          size={isEditing ? "icon" : undefined}
          className={cn(isEditing && "rounded-full")}
        >
          {isEditing
            ? (<X className='h-4 w-4' />)
            : !initialData.imageUrl
              ? (<>Add Image <PlusCircle className='h-4 w-4 ml-2' /></>)
              : (<>Edit Image <Pencil className='h-4 w-4 ml-2' /></>)
          }
        </Button>)}
      </div>
      {!isEditing &&
        (!initialData.imageUrl ?
          (<div className="flex items-center justify-center h-60 rounded-md bg-slate-200">
            <ImageIcon className='h-10 w-10 text-slate-500' />
          </div>)
          :
          (<div className="relative aspect-video mt-2 flex items-center">
            <Image
              alt="upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>)
        )}
      {isEditing &&
        (<div>
          <FileUpload
            endpoint='courseImage'
            onChange={url => {
              if (url) onSubmit({ imageUrl: url });
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>)
      }
    </div>
  );
}

export default ImageForm;