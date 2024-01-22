"use client"

import { Category } from "@prisma/client";
import {
  FcEngineering, FcFilmReel, FcMultipleDevices, FcMusic, FcOldTimeCamera,
  FcSalesPerformance, FcSportsMode
} from "react-icons/fc";

import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}

// TODO: Fix iconMap to match categories seeded in db
const iconMap: Record<Category["name"], IconType> {
  "Filming": FcFilmReel,
  "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Engineering": FcEngineering,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
}

const Categories = ({ items }: CategoriesProps): JSX.Element => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map(item => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
}

export default Categories;