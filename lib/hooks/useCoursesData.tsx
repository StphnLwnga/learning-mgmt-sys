import { redirect } from 'next/navigation';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Course } from "@prisma/client";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

/**
 * Fetches data from the API and updates the courses state.
 *
 * @return {Promise<void>} Promise that resolves when the data is fetched and the courses state is updated.
 */
export function useCoursesData(): { courses: Course[] } {
  const { toast } = useToast();

  const [courses, setCourses] = useState<Course[] | []>([]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const { data }: { data: Course[] } = await axios.get(`/api/courses`);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: 'Error',
          description: "Something went wrong!",
          variant: 'destructive',
          action: <ToastAction onClick={redirect('/')} altText="Try again">Try again</ToastAction>,
        });
      }
    }

    fetchData();
  }, []);

  return { courses };
}