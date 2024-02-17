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

export default Logo;import Image from "next/image";


const Logo = ({isDarkTheme}: {isDarkTheme: boolean}): JSX.Element => {
  return (
    <div className="flex justify-center items-center">
      <Image 
        height={180}
        width={200}
        alt="logo"
        src={isDarkTheme ? '/CourseNoma-logos_white.png' : '/CourseNoma-logos_black.png'}
        priority
      />
    </div>
  );
}
 
export default Logo;