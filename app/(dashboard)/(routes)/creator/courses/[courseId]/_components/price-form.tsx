"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Pencil, PlusCircle, Save, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormMessage, FormLabel, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Course } from '@prisma/client';
import { formatPrice } from '@/lib/format';


interface PriceFormProps {
  initialData: Course;
  courseId: string;
  userId: string;
}

const formSchema = z.object({
  price: z.coerce.number(),
});


const PriceForm = ({ initialData, courseId, userId }: PriceFormProps): JSX.Element => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  const isEditAuthorized = userId === initialData?.userId;

  const toggleEdit = () => setIsEditing(current => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
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
      await axios.patch(`/api/courses/${courseId}`, data);
      toast({
        title: 'Success',
        description: "Course price successfully set!",
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
        Course Price
        {isEditAuthorized && (
          <Button variant="ghost"
            onClick={toggleEdit}
            size={isEditing ? "icon" : undefined}
            className={cn(isEditing && "rounded-full")}
            disabled={isSubmitting}
          >
            {isEditing
              ? (<X className='h-4 w-4' />)
              : !initialData.price
                ? (<>Add Price <PlusCircle className='h-4 w-4 ml-2' /></>)
                : (<>Edit Price <Pencil className='h-4 w-4 ml-2' /></>)
            }
          </Button>)}
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.price && "text-slate-500 italic",
          !initialData.price && isDarkTheme && "text-slate-400",
        )}>
          {initialData.price && initialData?.price > 0.00
            ? formatPrice(initialData?.price)
            : "Free"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Set course price"
                      type="number"
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-x-2">
              {isSubmitting
                ? (<Loader2 className="h-6 w-6 animate-spin mr-2" />)
                : (<Button disabled={!isValid || isSubmitting} type="submit"
                  className={cn(
                    "text-slate-600 hover:text-slate-700 bg-sky-400/20 hover:bg-sky-500/20",
                    isDarkTheme && "text-slate-900 hover:text-slate-200 bg-slate-100"
                  )}>
                  Save
                  <Save className='h-4 w-4 ml-2' />
                </Button>)}
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default PriceForm;