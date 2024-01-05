"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil, Save, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from "@/lib/utils";
import { Form, FormControl, FormDescription, FormField, FormMessage, FormLabel, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";


interface TitleFormProps {
  initialData: {
    title: string,
  }
  courseId: string;
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
const TitleForm = ({ initialData, courseId }: TitleFormProps): JSX.Element => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  const toggleEdit = () => setIsEditing(current => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { toast } = useToast();

  const { isSubmitting, isValid } = form.formState;

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
        Course Title
        <Button
          variant="ghost"
          onClick={toggleEdit}
        // className={cn(isDarkTheme && "hover:bg-slate-500/20")}
        >
          {isEditing
            ? (<>Cancel <X className='h-4 w-4 ml-2' /></>)
            : (<>Edit Title <Pencil className='h-4 w-4 ml-2' /></>)
          }
        </Button>
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
                      disabled={isSubmitting}
                      placeholder="e.g. Advanced Web Development "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className={cn(
                  "text-slate-600 hover:text-slate-700 bg-sky-400/20 hover:bg-sky-500/20",
                  isDarkTheme && "text-slate-900 hover:text-slate-200 bg-slate-100"
                )}
              >
                Save
                <Save className='h-4 w-4 ml-2' />
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default TitleForm;