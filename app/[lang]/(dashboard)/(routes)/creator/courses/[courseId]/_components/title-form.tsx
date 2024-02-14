"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Pencil, Save, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormMessage, FormLabel, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Course } from '@prisma/client';


interface TitleFormProps {
  initialData: Course;
  courseId: string;
  userId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required,'
  })
});

/**
 * Renders a form for updating the course title.
 *
 * @param {Object} initialData - The initial data for the form.
 * @param {string} courseId - The ID of the course.
 * @return {JSX.Element} - The JSX element representing the title form.
 */
const TitleForm = ({ initialData, courseId, userId }: TitleFormProps): JSX.Element => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const { resolvedTheme } = useTheme();

  const toggleEdit = () => setIsEditing(current => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title,
    },
  });

  const { toast } = useToast();

  const { isSubmitting, isValid, isSubmitted } = form.formState;

  const reset = () => {
    setIsEditing(false)
  }

  /**
   * Submits the form data to update the course title.
   *
   * @param {z.infer<typeof formSchema>} data - The form data to be submitted.
   * @return {Promise<void>} - A promise that resolves when the update is successful.
   */
  const onSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    try {
      await axios.patch(`/api/courses/${courseId}`, data);
      toast({
        title: 'Success',
        description: "Course title successfully updated!",
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
        Course Title
        {userId === initialData?.userId && (<Button
          variant="ghost"
          onClick={toggleEdit}
          size={isEditing ? "icon" : undefined}
          className={cn(isEditing && "rounded-full")}
        >
          {isEditing
            ? (<X className='h-4 w-4' />)
            : (<>Edit Title <Pencil className='h-4 w-4 ml-2' /></>)
          }
        </Button>)}
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData.title}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-slate-200"
                      disabled={isSubmitting}
                      placeholder="e.g. Advanced Web Development "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-x-2">
              {isSubmitting
                ? (<Loader2 className="w-6 h-6 mr-2 animate-spin" />)
                : (<Button type="submit" disabled={isSubmitted && !isValid}
                  className={cn(
                    "text-slate-600 hover:text-slate-700 bg-sky-400/20 hover:bg-sky-500/20",
                    resolvedTheme === 'dark' && "text-slate-900 hover:text-slate-200 bg-slate-100"
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

export default TitleForm;