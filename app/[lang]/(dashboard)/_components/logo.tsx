import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useLanguageStore } from "@/lib/hooks";

const Logo = ({ isDarkTheme }: { isDarkTheme: boolean }): JSX.Element => {
  const { lang } = useLanguageStore();
  return (
    <Link href={`/${lang}`}>
      <div className="flex justify-center items-center">
        <Image
          height={180}
          width={180}
          alt="logo"
          priority
          src={isDarkTheme ? '/coursenoma_book_white.png' : '/coursenoma_book_blu.png'}
        />
      </div>
    </Link >
  );
}

export default Logo