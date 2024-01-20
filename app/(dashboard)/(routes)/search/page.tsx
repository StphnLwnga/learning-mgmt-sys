"use client"

import { useCategoryData } from "@/lib/hooks";
import Categories from "./_components/categories";


const SearchPage = (): JSX.Element => {
  const {categories} = useCategoryData();

  return (
    <div className="p-6">
      <Categories items={categories} />
    </div>
  );
}

export default SearchPage;