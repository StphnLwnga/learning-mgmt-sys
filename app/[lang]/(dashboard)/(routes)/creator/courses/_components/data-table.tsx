"use client"

import * as React from "react";
import Link from "next/link";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input"
import TooltipComponent from "@/components/tooltip-component";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";
import { useCoursesData } from "@/lib/hooks";
import { useTheme } from "next-themes";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  lang?: Locale;
  t: any;
}

export function DataTable<TData, TValue>({
  columns, lang, t,
}: DataTableProps<TData, TValue>) {
  const { courses } = useCoursesData();

  const { resolvedTheme } = useTheme();

  const data = React.useMemo(() => courses as TData[], [courses]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder={t.course.filterTitles}
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(e: { target: { value: any; }; }) => table.getColumn("title")?.setFilterValue(e.target.value)}
          className="max-w-sm focus-visible:ring-slate-200"
        />
        <TooltipComponent
          tooltipTrigger={
            <Link href={`${lang || "en"}/creator/create`}>
              <Button
                variant="ghost"
                className={cn("p-3", resolvedTheme !== 'dark' && "text-muted-foreground")}
              >
                {t.course.addCourse}
                <PlusCircle className="ml-2 h-6 w-5" />
              </Button>
            </Link>
          }
          tooltipContent={t?.courseTooltips?.createCourse}
        />

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <Skeleton className="h-24 text-center flex items-center justify-center" >
                    {t.course.noResults}
                  </Skeleton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {t.course.previous}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {t.course.next}
        </Button>
      </div>
    </div>
  )
}
