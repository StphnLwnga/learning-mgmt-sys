"use client"

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import {useLanguageStore} from "@/lib/hooks/useLanguageStore";

export const LanguageProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { lang } = useLanguageStore();

  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    console.log(`Language changed to ${lang}`);

    const localePath = pathname?.replace(/^\/\w{2}/, `/${lang}`);

    router.push(localePath);
  });

  return (
    <div>
      {children}
    </div>
  )
}