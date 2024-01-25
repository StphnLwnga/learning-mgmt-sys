import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IconType } from "react-icons";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
  isDarkTheme: boolean;
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
 * Renders a category item with label, value, and optional icon.
 *
 * @param {string} label - The label of the category item.
 * @param {string} value - The value of the category item.
 * @param {React.ElementType} Icon - The optional icon component.
 * @return {JSX.Element} The rendered category item.
 */
const CategoryItem = ({ label, value, isDarkTheme, icon: Icon }: CategoryItemProps): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

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
      <CategoryBadge badgeContent={0} color="primary" >
        <button type="button"
          className={cn(
            `flex items-center gap-x-1 rounded-full px-3 py-2 text-sm font-medium border border-slate-200 hover:border-sky-700 transition`,
            isSelected && "border-sky-700 bg-sky-200/20 text-sky-800",
            isSelected && isDarkTheme && "border-sky-700 bg-sky-300/30 text-slate-200",
          )}
          onClick={onClick}
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