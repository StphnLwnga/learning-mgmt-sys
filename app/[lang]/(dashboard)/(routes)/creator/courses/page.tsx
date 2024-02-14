import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';

import { useCoursesData } from "@/lib/hooks";

import { DataTable, columns } from "./_components";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";


const CoursesPage = async ({ params}: { params: { lang: Locale } }): Promise<JSX.Element> => {
  const { lang } = params;

  const t = await getDictionary(lang);

  return (
    <div className="p-6">
      <DataTable columns={columns} lang={lang} t={t} />
    </div>
  );
}

export default CoursesPage;