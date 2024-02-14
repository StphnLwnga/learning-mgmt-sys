import Link from "next/link";
import { MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Locale } from "@/i18n";

interface ColumnCellProps {
  id: string
  lang: Locale
  t: Record<string, any>
}

const ColumnCell = ({ id, lang, t }: ColumnCellProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-4 w-8 p-0">
          <span className="sr-only">{t.dataColumn.openMenu}</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/${lang}/creator/courses/${id}`}>
          <DropdownMenuItem className="justify-center hover:cursor-pointer">
            <Pencil className="h-4 w-4 mr-2" />
            {t.dataColumn.edit}
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ColumnCell;