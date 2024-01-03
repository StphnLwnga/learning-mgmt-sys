import { SignedIn, UserButton } from "@clerk/nextjs";

/**
 * Renders the Home component.
 *
 * @return {JSX.Element} The rendered Home component.
 */
export default function Home(): JSX.Element {
  return (
    <div className="h-full">
      <div className="fixed right-12 w-[83%] flex justify-end items-right top-5">
        <SignedIn >
          <UserButton afterSignOutUrl="/sign-in"  />
        </SignedIn>
      </div>
      <p className='text-3xl font-medium text-sky-700'>
        Protected page viewable only to logged in users
      </p>
    </div>
  )
}
