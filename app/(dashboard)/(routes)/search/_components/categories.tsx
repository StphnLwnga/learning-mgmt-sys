"use client"

import { Category } from "@prisma/client";

import CategoryItem from "./category-item";
import { categoryIconMap } from "./category-icon-map";

interface CategoriesProps {
  items: Category[];
}

const Categories = ({ items }: CategoriesProps): JSX.Element => {
  return (
    <div className="flex items-center gap-x-4 gap-y-3 pb-2 flex-wrap justify-start">
      {items.map(item => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={categoryIconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
}

export default Categories;