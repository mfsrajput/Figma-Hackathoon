"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the return URL or default to home
  const returnUrl = searchParams.get("redirect") || "/";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignIn path="/sign-in" redirectUrl={returnUrl} />
    </div>
  );
}
