"use client"

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Category } from "@prisma/client";

import CategoryItem from "./category-item";
import { categoryIconMap } from "./category-icon-map";

interface CategoriesProps {
  items: Category[];
}

const Categories = ({ items }: CategoriesProps): JSX.Element => {
  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  return (
    <div className="flex items-center gap-x-4 gap-y-3 pb-2 flex-wrap justify-start">
      {items.map(item => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={categoryIconMap[item.name]}
          value={item.id}
          isDarkTheme={isDarkTheme}
        />
      ))}
    </div>
  );
}

export default Categories;