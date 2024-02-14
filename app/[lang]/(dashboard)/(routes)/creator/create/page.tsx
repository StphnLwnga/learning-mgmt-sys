"use client"

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormMessage, FormLabel, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { X, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Locale } from '@/i18n';
// import toast from 'react-hot-toast';


const createCourseSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
})

/**
 * This file contains the implementation of a form in TypeScript.
 * The form is created using the useForm hook from the react-hook-form library.
 * It uses the createCourseSchema to define the form validation rules and default values.
 */
const CreatePage = ({ params }: { params: { lang: Locale } }): JSX.Element => {
  const router = useRouter();

  const { resolvedTheme } = useTheme();

  const { lang } = params;

  const { toast } = useToast();

  // Create the form using the useForm hook
  const form = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: '',
    },
  });

  const resetForm = () => {
    form.reset();
    form.clearErrors();
  }

  const cancelForm = () => {
    resetForm();
    router.push(`${lang}/creator/courses`);
  }

  const { isSubmitting, isValid, isSubmitted } = form.formState;

  /**
   * Submits a form with the given values to create a new course.
   *
   * @param {z.infer<typeof createCourseSchema>} values - The values of the form.
   * @return {Promise<void>} - A promise that resolves when the form submission is complete.
   */
  const onSubmit = async (values: z.infer<typeof createCourseSchema>) => {
    try {
      const response = await axios.post('/api/courses', values);

      router.push(`${lang}/creator/courses/${response?.data.id}`);
      // toast.success('Course created successfully');
      toast({
        title: 'Success',
        description: "Course successfully drafted!",
        onClick: () => resetForm(),
        className: `${resolvedTheme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-500 text-slate-100'} border-0 border-slate-200`,
      });
    } catch (e) {
      toast({
        title: 'Error',
        description: "Something went wrong!",
        variant: 'destructive',
        action: <ToastAction onClick={resetForm} altText="Try again">Try again</ToastAction>,
      });
      // toast.error("Something went wrong!");
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Course Title</h1>
        <p className={cn("text-sm", resolvedTheme === 'dark' ? "text-slate-400" : "text-slate-600")}>
          What would you like to name your course? Don&apos;t worry, you can change this later
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-slate-200"
                      placeholder="e.g. The Complete 2024 Web Development Bootcamp"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What this course will be about...
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-[59%]">
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "text-slate-600 hover:text-slate-700",
                  resolvedTheme === 'dark' && "text-slate-200 hover:text-slate-300"
                )}
                onClick={cancelForm}
              >
                Cancel
                <X className='h-4 w-4 ml-2' />
              </Button>
              {isSubmitting
                ? (<Loader2 className="w-6 h-6 mr-2 animate-spin" />)
                : (<Button type='submit' disabled={isSubmitted}
                  className={cn(
                    "bg-sky-600 text-white hover:bg-sky-700",
                    resolvedTheme === 'dark' && "bg-sky-400/20 text-slate-300 hover:bg-sky-400/50"
                  )}
                >
                  Continue
                  <ArrowRight className='h-4 w-4 ml-2' />
                </Button>)

              }
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreatePage;