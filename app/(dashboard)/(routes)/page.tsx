import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-screen">
      <p className='text-3xl font-medium text-sky-700'>
        Protected page viewable only to logged in users
      </p>
      <div className="absolute right-18 w-[97%] flex justify-end items-right top-5">
        <SignedIn >
          <UserButton afterSignOutUrl="/sign-in"  />
        </SignedIn>
      </div>
    </div>
  )
}
