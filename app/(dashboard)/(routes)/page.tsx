import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-screen">
      <p className='text-3xl font-medium text-sky-700'>
        Protected page viewable only to logged in users
      </p>
      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" showName />
      </SignedIn>
    </div>
  )
}
