import { IconType } from "react-icons";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  label: string;
  value?: string;
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
 * Renders a category item with label, value, and optional icon.
 *
 * @param {string} label - The label of the category item.
 * @param {string} value - The value of the category item.
 * @param {React.ElementType} Icon - The optional icon component.
 * @return {JSX.Element} The rendered category item.
 */
const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps): JSX.Element => {
  return (
    <div className="">
      <CategoryBadge badgeContent={0} color="primary" >
        <button className={cn(
          `flex items-center gap-x-1 rounded-full px-3 py-2 text-sm font-medium
         border border-slate-200 hover:border-sky-700 transition`,
        )}>
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