"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import axios from 'axios';
import MuxPlayer from "@mux/mux-player-react"
import { ImageIcon, Pencil, PlusCircle, VideoIcon, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Chapter, Course, MuxData } from '@prisma/client';
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import FileUpload from '@/components/file-upload';


interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});


const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps): JSX.Element => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const { resolvedTheme } = useTheme();

  const toggleEdit = () => setIsEditing(current => !current);

  const { toast } = useToast();

  const reset = () => {
    // setIsEditing(false)
    router.refresh();
  }

  /**
   * Submits the form data to the API endpoint for updating a course.
   *
   * @param {z.infer<typeof formSchema>} data - The form data to be submitted.
   * @return {Promise<void>} A promise that resolves when the update is successful.
   */
  const onSubmit = async (data: z.infer<typeof formSchema>): Promise<void> => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, data);
      toast({
        title: 'Success',
        description: "Chapter video successfully uploaded!",
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
        Chapter Video
        <Button
          variant="ghost"
          onClick={toggleEdit}
          size={isEditing ? "icon" : undefined}
          className={cn(isEditing && "rounded-full")}
        >
          {isEditing
            ? (<X className='h-4 w-4' />)
            : !initialData.videoUrl
              ? (<>Add Video <PlusCircle className='h-4 w-4 ml-2' /></>)
              : (<>Edit Video <Pencil className='h-4 w-4 ml-2' /></>)
          }
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ?
          (<div className="flex items-center justify-center h-60 rounded-md bg-slate-200 mt-4">
            <VideoIcon className='h-10 w-10 text-slate-500' />
          </div>)
          :
          (<div className="relative aspect-video mt-2 flex items-center">
            <MuxPlayer playbackId={initialData.muxData?.playbackId || ""} />
          </div>)
        )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint='chapterVideo'
            onChange={url => {
              if (url) onSubmit({ videoUrl: url });
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video.
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh page if video doesn&apos;t appear.
        </div>
      )}
    </div>
  );
}

export default ChapterVideoForm;