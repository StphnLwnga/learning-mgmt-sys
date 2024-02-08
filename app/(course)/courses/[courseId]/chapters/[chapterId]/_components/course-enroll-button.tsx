"use client"

import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";


interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch (error) {
      console.log("[COURSE_ENROLLMENR]", error);
      toast({
        title: 'Error',
        description: "Something went wrong!",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button
      size="sm"
      disabled={isLoading}
      onClick={onClick}
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
}

export default CourseEnrollButton;