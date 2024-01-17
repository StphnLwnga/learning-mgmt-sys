"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTheme } from 'next-themes';
import { Chapter } from "@prisma/client";
import { Trash, Loader2, } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import TooltipComponent from "@/components/tooltip-component";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ConfirmModal from "@/components/modals/confirm-modal";



interface ChapterActionsProps {
  initialData: Chapter;
  courseId: string;
  disabled: boolean;
}

const ChapterActions = ({ initialData, courseId, disabled }: ChapterActionsProps): JSX.Element => {
  const router = useRouter();

  const { toast } = useToast();

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  const { isPublished, id: chapterId, } = initialData;

  const reset = () => router.refresh();

  const handlePublishing = async ({ isPublished }: { isPublished: boolean }) => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, { isPublished: !isPublished });
      toast({
        title: 'Success',
        description: isPublished ? "Chapter successfully published!" : "Chapter successfully unpublished!",
        className: `${isDarkTheme ? 'bg-emerald-500' : 'bg-emerald-500 text-slate-100'} border-0 border-slate-200`,
      });
      router.refresh();
    } catch (error) {
      console.error("[CHAPTER_ACTIONS]", error);
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

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast({
        title: 'Success',
        description: "Chapter successfully published!",
        className: `${isDarkTheme ? 'bg-emerald-500' : 'bg-emerald-500 text-slate-100'} border-0 border-slate-200`,
      });
      router.push(`creator/courses/${courseId}`);
    } catch (error) {
      console.error("[CHAPTER_ACTIONS]", error);
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
        ? (<Loader2 className="h-4 w-4 animate-spin" />)
        : (
          <>
            <Button variant="outline"
              onClick={() => handlePublishing({ isPublished })}
              disabled={disabled}
              size="sm"
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
              tooltipContent="Delete chapter"
            />
          </>
        )
      }
    </div>
  );
}

export default ChapterActions;