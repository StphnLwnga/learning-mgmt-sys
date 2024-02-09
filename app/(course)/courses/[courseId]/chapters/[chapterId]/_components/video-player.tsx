"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from 'next-themes';
import axios from "axios";
import MuxPlayer from '@mux/mux-player-react';
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from '@/lib/hooks';

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}

const VideoPlayer = ({
  chapterId, title, courseId, nextChapterId, playbackId, isLocked, completeOnEnd,
}: VideoPlayerProps) => {
  const router = useRouter();

  const { toast } = useToast();
  
  const { theme } = useTheme();

  const confetti = useConfettiStore();

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  const onEnd = async () => {
    try {
      if (completeOnEnd){
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) confetti.onOpen();

        toast({
          title: "Success",
          description: "Marked as completed",
          className: "text-white",
        });
        router.refresh();

        if (nextChapterId) router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    } catch (error) {
      console.log("[COURSE_PROGRESS]", error);  
      toast({
        title: "Error",
        description: "Something went wrong!",
      })
    }
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="flex items-center justify-center absolute inset-0 bg-slate-800 rounded">
          <Loader2 
            className={cn(
              "w-8 h-8 animate-spin text-secondary",
              isDarkTheme && "text-slate-300",
            )}
           />
        </div>
      )}
      {isLocked && (
        <div className={cn(
          "flex flex-col gap-y-2 items-center justify-center absolute inset-0 bg-slate-800 rounded text-secondary",
          isDarkTheme && "text-slate-300",
        )}>
          <Lock className="h-8 w-8" />
          <p className="text-sm">Chapter locked.</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          playbackId={playbackId}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          // className={cn(
          //   !isReady && "hidden",
          // )}
        />
      )}
    </div>
  );
}

export default VideoPlayer;