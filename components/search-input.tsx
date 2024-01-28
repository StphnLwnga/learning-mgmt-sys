"use client"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { cn } from "@/lib/utils";
import { useDebounce } from "@/lib/hooks";
import { Input } from "@/components/ui/input";


const SearchInput = (): JSX.Element => {
  const { theme } = useTheme();

  const [value, setValue] = useState<undefined | string>();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  const debouncedValue = useDebounce(value, 500);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: debouncedValue,
        categoryId: currentCategoryId,
      },
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  }, [currentCategoryId, debouncedValue, pathname, router]);

  return (
    <div className="relative">
      <Search
        className={cn(
          "h-4 w-4 absolute top-3 left-3",
          !isDarkTheme && 'text-slate-600',
        )}
      />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search course title..."
        className={cn(
          "w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200",
          isDarkTheme && "bg-sky-300/30"
        )}
      />
    </div>
  );
}

export default SearchInput;