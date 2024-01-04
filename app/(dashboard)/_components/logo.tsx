import Image from "next/image";


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