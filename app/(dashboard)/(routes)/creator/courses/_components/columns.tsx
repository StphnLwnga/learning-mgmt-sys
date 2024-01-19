"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Course } from "@prisma/client";

// export interface CourseDataTableCols extends Course {
//   category: string;
// }

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "isPublished",
    header: "Published",
  },
];
