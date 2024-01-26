import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IconType } from "react-icons";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Category, Course } from "@prisma/client";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  item: Category;
  isDarkTheme: boolean;
  icon?: IconType;
}

const CategoryBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    marginRight: "8px",
    marginTop: "2px",
    borderRadius: "50%",
    padding: "4px",
    width: "auto",
    fontSize: "xx-small",
    backgroundColor: "#0268A3",
  },
}));

/**
 * A function that renders a category item component based on the given item, theme, and icon. 
 *
 * @param {CategoryItemProps} item - the category item to be rendered
 * @param {boolean} isDarkTheme - flag indicating whether the dark theme is enabled
 * @param {Icon} icon - the icon component to be rendered
 * @return {JSX.Element} the rendered category item component
 */
const CategoryItem = ({ item, isDarkTheme, icon: Icon }: CategoryItemProps): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [label, value] = [item?.name, item?.id];

  const currentCategoryId = searchParams.get("categoryId");

  // Preserve a user's last search term
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const [numCourses, setNumCourses] = useState(0);

  useEffect(() => {
    const courses = Object.values(item)[Object.values(item).length - 1] as unknown as Array<Course>;
    setNumCourses(courses.length);
  }, [item]);

  /**
   * A function that handles the click event and constructs a URL based on the current pathname, 
   * current title, and selected category ID. It then uses the router to navigate to the 
   * constructed URL.
   *
   * @return {void} 
   */
  const onClick = (): void => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : value,
      },
    }, { skipNull: true, skipEmptyString: true, });

    router.push(url);
  }

  return (
    <div className="">
      <CategoryBadge badgeContent={numCourses} color="primary" >
        <button type="button"
          onClick={onClick}
          className={cn(
            `flex items-center gap-x-1 rounded-full px-3 py-2 text-sm font-medium border border-slate-200 hover:border-sky-700 transition`,
            isSelected && "border-sky-700 bg-sky-200/20 text-sky-800",
            isSelected && isDarkTheme && "border-sky-700 bg-sky-300/30 text-slate-200",
          )}
        >
          {Icon && <Icon size={20} />}
          <div className="truncate">
            {label}
          </div>
        </button>
      </CategoryBadge>
    </div>
  );
}

export default CategoryItem;