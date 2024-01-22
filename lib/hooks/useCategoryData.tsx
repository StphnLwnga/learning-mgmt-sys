import { redirect } from 'next/navigation';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Course, Category } from "@prisma/client";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";


export function useCategoryData(): { categories: Category[] } {
  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[] | []>([]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const { data }: { data: Category[] } = await axios.get(`/api/categories`);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
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

  return { categories };
}