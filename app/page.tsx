"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to AI Ticket Sorter</h1>
      <p className="mb-6 text-lg text-gray-600">Categorize and assign tickets smartly with AI</p>

      <SignedIn>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Go to Dashboard
        </button>
      </SignedIn>

      <SignedOut>
        <SignInButton>
          <button className="bg-green-600 text-white px-6 py-2 rounded">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </main>
  );
}
