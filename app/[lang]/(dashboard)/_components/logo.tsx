import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

const Logo = ({ isDarkTheme, lang }: { isDarkTheme: boolean, lang?: string }): JSX.Element => {
  return (
    <Link href={lang ? `/${lang}` : "/"}>
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