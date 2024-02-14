"use client"

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import { FaChevronLeft, FaChevronRight, FaCircleArrowRight, FaRegCircleRight } from "react-icons/fa6";

import { Category } from "@prisma/client";

import { cn } from "@/lib/utils";
import { useCategoryData } from "@/lib/hooks";

import { Button } from "@/components/ui/button";
import TooltipComponent from "@/components/tooltip-component";
import { Skeleton } from "@/components/ui/skeleton";

import CategoryItem from "./category-item";
import { categoryIconMap } from "./category-icon-map";


const Categories = (): JSX.Element => {
  const ref = useRef<null | HTMLDivElement>(null);

  const { categories } = useCategoryData();

  const { resolvedTheme } = useTheme();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLeftZero, setIsLeftZero] = useState(true);

  useEffect(() => {
    setIsLoaded(categories.length > 0);
  }, [categories]);

  /**
   * Handles the scroll behavior.
   *
   * @param {number} scrollOffset - the amount to scroll
   * @return {void} 
   */
  const handleScroll = (scrollOffset: number): void => {
    if (ref && ref.current) {
      ref.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });

      const { scrollLeft } = ref.current;
      if (scrollLeft === 0) setIsLeftZero(!isLeftZero);
    }
  }

  return (
    <div className="flex items-center gap-x-2 gap-y-3">
      <div className={cn(`pt-3`, !isLeftZero && 'pt-5')}>
        <TooltipComponent
          tooltipTrigger={
            <Button
              disabled={isLeftZero}
              variant="ghost"
              onClick={() => handleScroll(-800)}
              className={cn(
                `rounded-full`,
                isLoaded && !isLeftZero && 'animate-bounce'
              )}
            >
              <FaChevronLeft
                className={cn(
                  "h-6 w-6 text-slate-400",
                  isLoaded && "text-[#0268A3]",
                  isLoaded && resolvedTheme === 'dark' && "text-sky-300/30",
                )}
              />
            </Button>
          }
          tooltipContent="Scroll categories"
        />
      </div>

      <div
        ref={ref}
        className="flex items-center gap-x-4 gap-y-3 pr-4 pt-[8px] justify-start scroll-container"
      >
        {isLoaded ? (
          <>
            {categories.map((category) => (
              <CategoryItem
                key={category?.id}
                icon={categoryIconMap[category?.name]}
                item={category}
                isDarkTheme={resolvedTheme === 'dark'}
              />
            ))}
          </>
        ) : (
          <>
            {Array(5).fill('_').map((_, index) => (
              <Skeleton key={index} className={
                `flex items-center justify-center gap-x-1 w-[280px] h-10 rounded-full 
                px-3 py-2 ring-slate-200 border border-slate-200 transition`
              }>
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
              </Skeleton>
            ))}
          </>
        )}
      </div>

      <div className={cn(`pt-3`, isLoaded && 'pt-5')}>
        <TooltipComponent
          tooltipTrigger={
            <Button
              variant="ghost"
              onClick={() => handleScroll(800)}
              className={cn(
                `rounded-full`,
                isLoaded && 'animate-bounce'
              )}
            >
              <FaChevronRight
                className={cn(
                  "h-6 w-6 text-slate-400",
                  isLoaded && "text-[#0268A3]",
                  isLoaded && resolvedTheme === 'dark' && "text-sky-300/30",
                )}
              />
            </Button>
          }
          tooltipContent="Scroll categories"
        />
      </div>

    </div>
  );
}

export default Categories;