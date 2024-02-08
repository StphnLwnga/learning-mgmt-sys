import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/lib/hooks";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface CourseProgressButtonProps {
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isCompleted: boolean;
}

const CourseProgressButton = ({ courseId, chapterId, nextChapterId, isCompleted }: CourseProgressButtonProps): JSX.Element => {
  const router = useRouter();

  const confetti = useConfettiStore();

  const user = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const {toast} = useToast();

  const Icon = isCompleted ? XCircle : CheckCircle;

  const onClick = async () => {
    setIsLoading(true);
    try {
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted,
      });

      if (!isCompleted && !nextChapterId) confetti.onOpen();

      if(!isCompleted && nextChapterId) router.push(`/courses/${courseId}/chapters/${nextChapterId}`);

      toast({
        title: "Success",
        description: `${isCompleted ? "Marked as not completed" : "Marked as completed"}`,
        className: "bg-emerald-500",
      });
      
      router.refresh();
    } catch (error) {
      console.log("[COURSE_PROGRESS]", error);
      toast({
        title: "Error",
        description: "Failed to fetch user progress!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button className="w-full md:w-auto"
      type="button"
      variant={isCompleted ? "outline" : "success"}
      disabled={isLoading}
      onClick={onClick}
    >
      {isCompleted ? "Not Completed" : "Mark as Complete"}
      <Icon className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default CourseProgressButton;