import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { isInstructor } from "@/lib/instructor";

const CreatorLayout = ({children}: {children: React.ReactNode}) => {
  const {userId} = auth();

  if (!isInstructor(userId)) return redirect("/");

  return (<>{children}</>);
}
 
export default CreatorLayout;