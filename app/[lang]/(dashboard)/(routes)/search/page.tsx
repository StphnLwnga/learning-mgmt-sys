import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { CoursesWithProgressWithCategory, getCourses } from "@/actions/get-courses";
import SearchInput from "@/components/search-input";
import CoursesList from "@/components/courses-list";

import Categories from "./_components/categories";
import { Locale } from "@/i18n";


interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
}

interface SearchPagePropsWithLang extends SearchPageProps {
  params: {
    lang: Locale;
  }
}

const SearchPage = async ({ searchParams, params }: SearchPagePropsWithLang): Promise<JSX.Element> => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const courses: CoursesWithProgressWithCategory[] | [] = await getCourses({ userId, ...searchParams });

  const { lang } = params;

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