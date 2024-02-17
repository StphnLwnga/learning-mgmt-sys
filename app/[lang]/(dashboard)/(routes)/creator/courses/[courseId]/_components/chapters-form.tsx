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
import { ChaptersList } from '.';
import { useLanguageStore } from '@/lib/hooks';


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

  const lang = useLanguageStore(state => state.lang);

  const { resolvedTheme } = useTheme();

  const isEditAuthorized = userId === initialData?.userId;

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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
        className: `${resolvedTheme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-500 text-slate-100'} border-0 border-slate-200`,
        description: "Chapter successfully added",
      });
      toggleCreateChapter();
      form.reset();
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

  /**
   * Updates the order of chapters in a course asynchronously.
   *
   * @param {Array<{ id: string, position: number }>} updateData - An array of objects containing the id and position of chapters to be updated.
   * @return {Promise<void>} - A Promise that resolves when the chapters are reordered successfully.
   */
  const onReorder = async (updateData: { id: string, position: number }[]): Promise<void> => {
    setIsUpdating(true);
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast({
        title: 'Course Chapters',
        description: "Chapters reordered successfully!",
        className: `${resolvedTheme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-500 text-slate-100'} border-0 border-slate-200`,
      });
      router.refresh();
    } catch (error) {
      console.log("[CHAPTER_REORDER]", error)
      toast({
        title: 'Error',
        description: "Failed to reorder chapters!",
        variant: 'destructive',
        action: <ToastAction onClick={reset} altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsUpdating(false);
    }
  }

  const onEdit = async (id: string): Promise<void> => {
    router.push(`/${lang}/creator/courses/${courseId}/chapters/${id}`);
  }

  return (
    <div className={cn(
      "relative mt-6 border bg-slate-100 rounded-md p-4",
      resolvedTheme === 'dark' && "bg-sky-300/30"
    )}>
      {isUpdating && (
        <div className={cn(
          "absolute h-full w-full bg-slate-500/20 top-0 right-0 flex items-center justify-center",
          resolvedTheme === 'dark' && "bg-slate-900/60",
        )}>
          <Loader2
            className={cn(
              "animate-spin mx-auto my-auto h-20 w-20",
              resolvedTheme !== 'dark' && "text-sky-700",
            )}
          />
        </div>
      )}
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
                      className="focus-visible:ring-slate-200"
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
                    resolvedTheme === 'dark' && "text-slate-900 hover:text-slate-200 bg-slate-100"
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
            !initialData.chapters.length && resolvedTheme === 'dark' && "text-slate-400",
          )}
        >
          {!initialData.chapters.length && "No chapters published"}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
            isDarkTheme={resolvedTheme === 'dark'}
          />
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