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
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
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
const CreatePage = () => {
  const router = useRouter();

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

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
    router.push('/creator/courses');
  }

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof createCourseSchema>) => {
    try {
      const response = await axios.post('/api/courses', values);
      router.push(`/creator/courses/${response?.data.id}`);
      // toast.success('Course created successfully');
      ({
        title: 'Success',
        description: "Successfully created course!",
        close: () => {resetForm();},
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
        <p className={cn("text-sm", isDarkTheme ? "text-slate-400" : "text-slate-600")}>
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
                      placeholder="e.g. The Complete 2024 Web Development Bootcamp"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What this course will be about
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-[57%]">
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "text-slate-600 hover:text-slate-700",
                  isDarkTheme && "text-slate-200 hover:text-slate-300"
                )}
                onClick={cancelForm}
              >
                Cancel
                <X className='h-4 w-4 ml-2' />
              </Button>
              <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                className={cn(
                  "bg-sky-600 text-white hover:bg-sky-700",
                  isDarkTheme && "bg-sky-400/20 text-slate-300 hover:bg-sky-400/50"
                )}
              >
                Continue
                <ArrowRight className='h-4 w-4 ml-2' />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreatePage;