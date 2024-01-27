"use client"

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaCircleArrowRight, FaRegCircleRight } from "react-icons/fa6";

import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";

import CategoryItem from "./category-item";
import { categoryIconMap } from "./category-icon-map";
import TooltipComponent from "@/components/tooltip-component";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";


/**
 * Renders a list of category items based on the provided items array.
 *
 * @param {Array<Category>} items - The array of category items to be rendered.
 * @return {JSX.Element} The JSX element representing the rendered category items.
 */
const Categories = ({ items }: { items: Category[] }): JSX.Element => {
  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  useEffect(() => {
    console.log({ items_loaded: items.length === 0 });
    setIsLoaded(items.length > 0);
  }, [items]);

  return (
    <div className="flex items-center gap-x-2 gap-y-3">
      <div className="flex items-center gap-x-4 gap-y-3 pr-4 justify-start overflow-x-clip ">
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
                `flex items-center justify-center gap-x-1 w-[280px] h-10 rounded-full px-3 py-2 ring-slate-200 border border-slate-200 transition`
              }>
                <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
              </Skeleton>
            ))}
          </>
        )}
      </div>
      <div className="ml-0">
        <TooltipComponent
          tooltipTrigger={
            <Button
              variant="ghost"
              className={cn(`rounded-full`, isLoaded && 'animate-bounce')}
            >
              <FaRegCircleRight
                className={cn(
                  "h-6 w-6 text-slate-400",
                  isLoaded && "text-[#0268A3]",
                  isLoaded && isDarkTheme && "text-sky-300/30",
                )}
              />
            </Button>
          }
          tooltipContent="View all categories"
        />
      </div>
    </div>
  );
}

export default Categories;