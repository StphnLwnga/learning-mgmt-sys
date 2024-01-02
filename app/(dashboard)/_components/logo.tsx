import Image from "next/image";

const Logo = ({src}: {src: string}): JSX.Element => {
  return (
    <div className="flex justify-center items-center">
      <Image 
        height={120}
        width={120}
        alt="logo"
        src={src}
      />
    </div>
  );
}
 
export default Logo;