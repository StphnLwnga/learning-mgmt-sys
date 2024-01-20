"use client"

import { Category } from "@prisma/client";
import {
  FcEngineering, FcFilmReel, FcMultipleDevices, FcMusic, FcOldTimeCamera,
  FcSalesPerformance, FcSportsMode
} from "react-icons/fc";

interface CategoriesProps {
  items: Category[];
}

// TODO: Create iconMap 

const Categories = ({ items }: CategoriesProps): JSX.Element => {
  return (
    <div className="p-6">

    </div>
  );
}

export default Categories;