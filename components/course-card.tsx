import React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import IconBadge from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

const CourseCard: React.FC<CourseCardProps> = (
  { id, title, imageUrl, chaptersLength, price, progress, category }: CourseCardProps
) => {

  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow:hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            alt={title}
            src={imageUrl}
            fill
            className="cover"
          />
        </div>
        <div className="flex flex-col pt-2">
          <div
            className={cn(
              "text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2",
            )}
          >
            {title}
          </div>
          <p className={cn("text-muted-foreground text-xs")}>
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>{chaptersLength} {`Chapter${chaptersLength > 1 ? 's' : ''}`}</span>
            </div>
          </div>
          {progress !== null
            ? (
              <div className="">
                TODO: Progress Component
              </div>
            )
            : (
              <p className="text-sm md:text-xs font-medium text-slate-700">
                {formatPrice(price)}
              </p>
            )
          }
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;