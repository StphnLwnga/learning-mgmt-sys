"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, PlusCircle, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormMessage, FormLabel, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Course, Chapter } from '@prisma/client';


interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
  userId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

/**
 * Renders a form for editing the course description.
 *
 * @param {object} initialData - The initial data for the form.
 * @param {string} courseId - The ID of the course.
 * @returns {JSX.Element} - The JSX element representing the form.
 */
const ChaptersForm = ({ initialData, courseId, userId }: ChaptersFormProps): JSX.Element => {
  const router = useRouter();

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  const isEditAuthorized = userId === initialData?.userId;

  const [isCreating, setIsCreating] = useState(false);

  const toggleCreateChapter = () => setIsCreating(current => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { toast } = useToast();

  const { isSubmitting, isValid, isSubmitted } = form.formState;

  const reset = () => router.refresh();

  /**
   * Submit the form data asynchronously.
   *
   * @param {z.infer<typeof formSchema>} data - The data to be submitted.
   * @return {Promise<void>} Promise that resolves when the submission is complete.
   */
  const onSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, data);
      toast({
        title: 'Success',
        description: "Chapter successfully added",
      });
      toggleCreateChapter();
      router.refresh();
    } catch (error) {
      console.log("[COURSEID]", error);
      toast({
        title: 'Error',
        description: "Failed to add chapter",
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
        Course Chapters
        {isEditAuthorized && (
          <Button variant="ghost"
            onClick={toggleCreateChapter}
            size={isCreating ? "icon" : undefined}
            className={cn(isCreating && "rounded-full")}
          >
            {isCreating
              ? (<X className='h-4 w-4' />)
              : (<>Add a chapter <PlusCircle className='h-4 w-4 ml-2' /></>)
            }
          </Button>
        )}
      </div>
      {isCreating && (
        <Form {...form}>
          <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Introduction to the course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-x-2">
              {isSubmitting
                ? (<div className='ml-auto'>
                  <Loader2 className='h-8 w-8 animate-spin' />
                </div>)
                : (<Button disabled={!isValid || isSubmitting} type="submit"
                  className={cn(
                    "text-slate-600 hover:text-slate-700 bg-sky-400/20 hover:bg-sky-500/20",
                    isDarkTheme && "text-slate-900 hover:text-slate-200 bg-slate-100"
                  )}>
                  Add
                  <PlusCircle className='h-4 w-4 ml-2' />
                </Button>)}
            </div>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic",
            !initialData.chapters.length && isDarkTheme && "text-slate-400",
          )}
        >
          {!initialData.chapters.length && "No chapters published"}
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag & drop to reorder chapters
        </p>
      )}
    </div>
  );
}

export default ChaptersForm;