'use client';

import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function AuthButtons() {
  const { isSignedIn } = useAuth();  // Correct hook to access signed-in state
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // Prevents hydration mismatch

  return (
    <div className="auth-buttons">
      {/* Conditional rendering based on authentication state */}
      {isSignedIn ? <UserButton /> : <SignInButton />}
    </div>
  );
}
