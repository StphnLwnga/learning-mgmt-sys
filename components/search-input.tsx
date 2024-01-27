"use client"

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";


interface SearchInputProps {
  isDarkTheme: boolean;
}

const SearchInput = ({ isDarkTheme }: SearchInputProps): JSX.Element => {
  return (
    <div className="relative">
      <Search
        className={cn(
          "h-4 w-4 absolute top-3 left-3",
          !isDarkTheme && 'text-slate-600',
        )}
      />
      <Input
        className={cn(
          "w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200",
          isDarkTheme && "bg-sky-300/30"
        )}
        placeholder="Search course title..."
      />
    </div>
  );
}

export default SearchInput;