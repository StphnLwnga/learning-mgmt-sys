"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, Pencil, PlusCircle, Save, X } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Chapter } from '@prisma/client';
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormMessage, FormLabel, FormItem, FormDescription } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Textarea } from '@/components/ui/textarea';
import { Editor } from '@/components/editor';
import { Preview } from '@/components/preview';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';


interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

/**
* Renders the ChapterAccessForm component.
*
* @param {ChapterAccessFormProps} initialData - The initial data for the form.
* @param {string} courseId - The ID of the course.
* @param {string} chapterId - The ID of the chapter.
* @returns {JSX.Element} The rendered ChapterAccessForm component.
*/
const ChapterAccessForm = ({ initialData, courseId, chapterId }: ChapterAccessFormProps): JSX.Element => {
  const router = useRouter();

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  const toggleEdit = () => setIsEditing(current => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree,
    },
  });

  const { toast } = useToast();

  const { isSubmitting, isValid, isSubmitted } = form.formState;

  const reset = () => {
    setIsEditing(false);
    router.refresh();
  }

  /**
   * Submit the form data asynchronously.
   *
   * @param {z.infer<typeof formSchema>} data - The data to be submitted.
   * @return {Promise<void>} Promise that resolves when the submission is complete.
   */
  const onSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, data);
      toast({
        title: 'Success',
        description: "Chapter access settings succeeesfully updated!",
        className: `${isDarkTheme ? 'bg-emerald-500' : 'bg-emerald-500 text-slate-100'} border-0 border-slate-200`,
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
      isDarkTheme && "bg-sky-300/30"
    )}>
      <div className="font-medium flex items-center justify-between">
        Chapter Access
        <Button variant="ghost"
          onClick={toggleEdit}
          size={isEditing ? "icon" : undefined}
          disabled={isSubmitting}
          aria-label={isEditing ? "Cancel" : "Edit"}
          className={cn(
            !isDarkTheme && "hover:bg-slate-300",
            isEditing && "rounded-full",
          )}
        >
          {isEditing
            ? (<X className='h-4 w-4' />)
            : (<>
              Change access
              {initialData.isFree ? <EyeOff className='h-4 w-4 ml-2' /> : <Eye className='h-4 w-4 ml-2' />}
            </>)
          }
        </Button>
      </div>
      {!isEditing &&
        (initialData.isFree
          ? (<Badge className={cn(isDarkTheme && "bg-[#020817] text-slate-100 hover:bg-[#020817]",)}>
            Free
          </Badge>)
          : (<p className="text-sm mt-2 italic">This chapter is not free</p>)
        )
      }
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className={cn(
                  "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
                  isDarkTheme && 'border-slate-200 border-opacity-50',
                )}>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={cn(
                        "data-[state=checked]:bg-sky-700 border border-sky-700",
                        isDarkTheme && "data-[state=checked]:bg-slate-200 border border-slate-200",
                      )}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check to make this chapter free for preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-x-2">
              {isSubmitting
                ? (<Loader2 className="h-6 w-6 mr-2 animate-spin" />)
                : (<Button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  className={cn(
                    "text-slate-600 hover:text-slate-700 bg-sky-400/20 hover:bg-sky-500/20",
                    isDarkTheme && "text-slate-900 hover:text-slate-200 bg-slate-100"
                  )}
                >
                  Save
                  <Save className='h-4 w-4 ml-2' />
                </Button>)
              }
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default ChapterAccessForm;