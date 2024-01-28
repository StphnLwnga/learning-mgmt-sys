// a component called CoursesListSkeleton
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { MdHideImage } from "react-icons/md";

export const CoursesListSkeleton = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="group hover:shadow-sm transition overflow:hidden border rounded-lg p-3 h-full">
          <Skeleton className="relative w-full aspect-video rounded-md overflow-hidden flex items-center justify-center">
            <MdHideImage className="h-8 w-8 text-slate-500" />
          </Skeleton>
          <div className="flex flex-col pt-4">
            <Skeleton className="w-[45%] h-3" />
            <div className="mb-3"></div>
            <Skeleton className="w-[20%] h-2" />
            <Skeleton
              className={cn(
                "text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2",
              )}
            />
          </div>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center space-4 text-slate-500">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="mr-2"></div>
              <Skeleton className="h-2 w-15" />
            </div>
          </div>
          <Skeleton className="h-2 w-[15%]" />
        </div>
      ))}
    </div>
  );
}