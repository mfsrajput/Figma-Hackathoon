'use client';

import { useAuth } from '@clerk/nextjs';
import { SignInButton, UserButton } from '@clerk/nextjs';

export default function AuthButtons() {
  const { isSignedIn } = useAuth();  // Correct hook to access signed-in state

  return (
    <div className="auth-buttons">
      {/* Conditional rendering based on authentication state */}
      {isSignedIn ? (
        <UserButton />
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
