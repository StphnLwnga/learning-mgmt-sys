import Image from "next/image";

/**
 * Renders a logo with the given source.
 *
 * @param {string} src - The URL of the logo image.
 * @returns {JSX.Element} - The rendered logo component.
 */
const Logo = ({src}: {src: string}): JSX.Element => {
  return (
    <div className="flex justify-center items-center">
      <Image 
        height={140}
        width={160}
        alt="logo"
        src={src}
      />
    </div>
  );
}
 
export default Logo;