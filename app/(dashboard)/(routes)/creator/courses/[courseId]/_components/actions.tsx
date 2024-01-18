"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTheme } from 'next-themes';
import { Course } from "@prisma/client";
import { Trash, Loader2, } from "lucide-react";

import { Button } from "@/components/ui/button";
import TooltipComponent from "@/components/tooltip-component";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ConfirmModal from "@/components/modals/confirm-modal";


interface ActionsProps {
  initialData: Course;
  courseId: string;
  disabled: boolean;
}

const Actions = ({ initialData, courseId, disabled }: ActionsProps): JSX.Element => {
  const router = useRouter();

  const { toast } = useToast();

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  const { isPublished } = initialData;

  const reset = () => router.refresh();

  const handlePublishing = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/courses/${courseId}/${isPublished ? 'unpublish' : 'publish'}`);
      toast({
        title: 'Success',
        description: isPublished ? "Course successfully unpublished!" : "Course successfully published!",
        className: `${isDarkTheme && 'text-slate-100'} bg-emerald-500 border-0 border-slate-200`,
      });
      router.refresh();
    } catch (error) {
      console.error("[COURSE_ACTIONS]", error);
      toast({
        title: 'Error',
        description: "Something went wrong!",
        variant: 'destructive',
        action: <ToastAction onClick={reset} altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}`);
      toast({
        title: 'Success',
        description: "Course successfully deleted!",
        className: `${isDarkTheme && 'text-slate-100'} bg-emerald-500 border-0 border-slate-200`,
      });
      router.refresh();
      router.push(`/creator/courses/${courseId}`);
    } catch (error) {
      console.error("[COURSE_ACTIONS]", error);
      toast({
        title: 'Error',
        description: "Something went wrong!",
        variant: 'destructive',
        action: <ToastAction onClick={reset} altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      {isLoading
        ? (<Loader2 className="h-5 w-5 animate-spin" />)
        : (
          <>
            <Button size="sm"
              variant="outline"
              onClick={handlePublishing}
              disabled={disabled}
            >
              {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <TooltipComponent
              tooltipTrigger={
                <ConfirmModal onConfirm={handleDelete}>
                  <Button size="sm" >
                    <Trash className="h-4 w-4" />
                  </Button>
                </ConfirmModal>
              }
              tooltipContent="Delete Course"
            />
          </>
        )
      }
    </div>
  );
}

export default Actions;