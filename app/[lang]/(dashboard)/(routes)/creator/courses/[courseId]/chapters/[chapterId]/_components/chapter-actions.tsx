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
import { useLanguageStore } from "@/lib/hooks";


interface ChapterActionsProps {
  initialData: Chapter;
  courseId: string;
  disabled: boolean;
}

/**
 * Renders the chapter actions component.
 *
 * @param {ChapterActionsProps} initialData - The initial data for the component.
 * @param {string} courseId - The ID of the course.
 * @param {boolean} disabled - Indicates if the component is disabled.
 * @return {JSX.Element} - The chapter actions component.
 */
const ChapterActions = ({ initialData, courseId, disabled }: ChapterActionsProps): JSX.Element => {
  const router = useRouter();

  const lang = useLanguageStore(state => state.lang);

  const { toast } = useToast();

  const { resolvedTheme } = useTheme();
  
  const [isLoading, setIsLoading] = useState(false);

  const { isPublished, id: chapterId, } = initialData;

  const reset = () => router.refresh();

  /**
   * Handles the publishing/unpublishing of the chapter.
   *
   * @return {Promise<void>} - A Promise that resolves when the publishing/unpublishing is complete.
   */
  const handlePublishing = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/${isPublished ? 'unpublish' : 'publish'}`);
      toast({
        title: 'Success',
        description: isPublished ? "Chapter successfully unpublished!" : "Chapter successfully published!",
        className: `${resolvedTheme === 'dark' && 'text-slate-100'} bg-emerald-500 border-0 border-slate-200`,
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

  /**
   * Deletes a chapter from a course.
   *
   * @return {Promise<void>} - Returns a promise that resolves when the chapter is successfully deleted.
   */
  const handleDelete = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast({
        title: 'Success',
        description: "Chapter successfully deleted!",
        className: `${resolvedTheme === 'dark' && 'text-slate-100'} bg-emerald-500 border-0 border-slate-200`,
      });
      router.refresh();
      router.push(`/${lang}/creator/courses/${courseId}`);
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
              tooltipContent="Delete chapter"
            />
          </>
        )
      }
    </div>
  );
}

export default ChapterActions;