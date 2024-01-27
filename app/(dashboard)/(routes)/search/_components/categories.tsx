"use client"

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { FaChevronLeft, FaChevronRight, FaCircleArrowRight, FaRegCircleRight } from "react-icons/fa6";

import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";

import CategoryItem from "./category-item";
import { categoryIconMap } from "./category-icon-map";
import TooltipComponent from "@/components/tooltip-component";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface CategoriesProps {
  items: Category[];
  isDarkTheme: boolean
}

/**
 * Renders a list of category items based on the provided items array.
 *
 * @param {Array<Category>} items - The array of category items to be rendered.
 * @return {JSX.Element} The JSX element representing the rendered category items.
 */
const Categories = ({ items, isDarkTheme }: CategoriesProps): JSX.Element => {
  const ref = useRef<null | HTMLDivElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLeftZero, setIsLeftZero] = useState(true);

  useEffect(() => {
    setIsLoaded(items.length > 0);
  }, [items]);

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
                  isLoaded && isDarkTheme && "text-sky-300/30",
                )}
              />
            </Button>
          }
          tooltipContent="Scroll for more"
        />
      </div>

      <div
        ref={ref}
        className="flex items-center gap-x-4 gap-y-3 pr-4 pt-[8px] justify-start scroll-container"
      >
        {isLoaded ? (
          <>
            {items.map((item) => (
              <CategoryItem
                key={item?.id}
                icon={categoryIconMap[item?.name]}
                item={item}
                isDarkTheme={isDarkTheme}
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
                isLoaded && !isLeftZero && 'animate-bounce'
              )}
            >
              <FaChevronRight
                className={cn(
                  "h-6 w-6 text-slate-400",
                  isLoaded && "text-[#0268A3]",
                  isLoaded && isDarkTheme && "text-sky-300/30",
                )}
              />
            </Button>
          }
          tooltipContent="Scroll for more"
        />
      </div>

    </div>
  );
}

export default Categories;