import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { CoursesWithProgressWithCategory, getCourses } from "@/actions/get-courses";
import SearchInput from "@/components/search-input";
import CoursesList from "@/components/courses-list";

import Categories from "./_components/categories";


interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({ searchParams }: SearchPageProps): Promise<JSX.Element> => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const courses: CoursesWithProgressWithCategory[] | [] = await getCourses({ userId, ...searchParams });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories />
        <CoursesList items={courses} />
      </div>
    </>
  );
}

export default SearchPage;