"use client"

import { useEffect, useMemo, useState } from "react";
import { Chapter } from "@prisma/client";
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from '@hello-pangea/dnd';
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
  items: Chapter[] | [];
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string, position: number }[]) => void;
  isDarkTheme: boolean;
}

/**
 * Renders a list of chapters with drag and drop functionality.
 *
 * @param {ChaptersListProps} items - The list of chapters to render.
 * @param {Function} onEdit - The callback function to handle chapter editing.
 * @param {Function} onReorder - The callback function to handle chapter reordering.
 * @param {boolean} isDarkTheme - A flag indicating whether the dark theme is enabled.
 * @return {JSX.Element | null} The rendered list of chapters or null if the component is not mounted yet.
 */
const ChaptersList = ({ items, onEdit, onReorder, isDarkTheme }: ChaptersListProps): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);

  const [chapters, setChapters] = useState(items);

  // Addresses hydration error due to drag n drop component not being optimized for server components & SSR
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Rehydrate chapters list on reordering
  useEffect(() => {
    setChapters(items);
  }, [items]);

  /**
   * Handles the event when a drag operation ends.
   *
   * @param {DropResult} result - The result of the drag operation.
   * @return {void} This function does not return anything.
   */
  const onDragEnd = (result: DropResult): void => {
    if (!result.destination || (result.source.index === result.destination.index))
      return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const [startIndex, endIndex] = [
      Math.min(result.source.index, result.destination.index),
      Math.max(result.source.index, result.destination.index),
    ];

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex(item => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  }

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}
            className=""
          >
            {chapters?.map((chapter, index) => (
              <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700",
                      isDarkTheme && "",
                      isDarkTheme && chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700",
                    )}
                  >
                    <div {...provided.dragHandleProps}
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition border-r-slate-300/50",
                        chapter.isPublished && "border-r-sky-200 hover:bg-sky-200",
                        isDarkTheme && chapter.isPublished && "border-r-sky-200 hover:bg-sky-200",
                        isDarkTheme && !chapter.isPublished && "hover:bg-slate-200",
                      )}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && (
                        <Badge className={cn(
                          isDarkTheme && "bg-[#020817] text-slate-100 hover:bg-[#020817]",
                        )}>
                          Free
                        </Badge>
                      )}
                      <Badge className={cn(
                        "bg-slate-500 text-slate-100",
                        chapter.isPublished && "bg-sky-700",
                        isDarkTheme && chapter.isPublished && "hover:bg-slate-700",
                        isDarkTheme && !chapter.isPublished && "border-r-slate-200 hover:bg-slate-700",
                      )}>
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(chapter.id)}
                        className="h-4 w-4 cursor-pointer transition hover:opacity-75"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ChaptersList;