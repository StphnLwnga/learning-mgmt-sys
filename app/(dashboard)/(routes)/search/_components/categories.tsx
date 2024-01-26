"use client"

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Category } from "@prisma/client";

import CategoryItem from "./category-item";
import { categoryIconMap } from "./category-icon-map";


/**
 * Renders a list of category items based on the provided items array.
 *
 * @param {Array<Category>} items - The array of category items to be rendered.
 * @return {JSX.Element} The JSX element representing the rendered category items.
 */
const Categories = ({ items }: {items: Category[]}): JSX.Element => {
  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [ theme]);

  return (
    <div className="flex items-center gap-x-4 gap-y-3 pb-2 flex-wrap justify-start">
      {items.map((item) => (
        <CategoryItem
          key={item?.id}
          icon={categoryIconMap[item?.name]}
          item={item}
          isDarkTheme={isDarkTheme}
        />
      ))}
    </div>
  );
}

export default Categories;