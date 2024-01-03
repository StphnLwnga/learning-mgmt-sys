import { SignedIn, UserButton } from "@clerk/nextjs";

/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The rendered Home component.
 */
export default function Home(): JSX.Element {
  return (
    <div className="h-full">
      <p className='text-3xl font-medium text-sky-700'>
        Protected page viewable only to logged in users
      </p>
    </div>
  )
}
