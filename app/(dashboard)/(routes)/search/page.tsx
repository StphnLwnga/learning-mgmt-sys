"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { useCategoryData } from "@/lib/hooks";
import SearchInput from "@/components/search-input";

import Categories from "./_components/categories";


const SearchPage = (): JSX.Element => {
  const { categories } = useCategoryData();

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput isDarkTheme={isDarkTheme} />
      </div>
      <div className="p-6">
        <Categories items={categories} isDarkTheme={isDarkTheme} />
      </div>
    </>
  );
}

export default SearchPage;