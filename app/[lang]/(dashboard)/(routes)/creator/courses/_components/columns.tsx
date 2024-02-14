"use client"

import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { Course } from "@prisma/client";
import { ArrowUpDown, MoreHorizontal, Pencil, ShieldAlert, ShieldCheck, } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { Locale } from "@/i18n";
import ColumnCell from "./column-cell";

// interface CourseCols extends Omit<Course, 'isPublished'> {
//   isPublished: string;
// }

export const columns: ColumnDef<Course>[] = ([
  {
    accessorKey: "title",
    header: ({ column }) => {

      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }): JSX.Element => {
      const price  = row.original.price as number;
      return (
        <div className="flex">
          {price == 0
            ? (<Badge>Free</Badge>)
            : formatPrice(price) 
          }
        </div>
      );
    },
  },
  {
    accessorKey: "category.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "isPublished",
    header: "Published",
    cell: ({ row }): JSX.Element => {
      const { isPublished } = row.original;
      return (
        <div className="flex ml-6">
          {
            isPublished
              ? <ShieldCheck className="h-6 w-6 text-green-500" />
              : <ShieldAlert className="h-6 w-6 text-yellow-500" />
          }
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }): JSX.Element => {
      const { id } = row.original;

      return (
        // <ColumnCell id={id} lang={lang} t={t} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal  className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`en/creator/courses/${id}`}>
              <DropdownMenuItem className="justify-center hover:cursor-pointer">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
]);
