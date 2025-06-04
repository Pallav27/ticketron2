"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center">
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">
          TICKE<span className="text-green-400">TRON</span>
        </h1>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="default">Sign In</Button>
          </SignInButton>
        </SignedOut>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-20 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Effortless Query Management <br />
          with <span className="text-yellow-400">TickeTron</span>
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Experience the future of support with AI-powered ticket sorting. TickeTron intelligently
          categorizes, assigns, and summarizes user queries, streamlining your support process like never before.
          Say goodbye to manual sorting and hello to efficient, automated support management.
        </p>

        <div className="flex gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="secondary" className="bg-green-600 hover:bg-green-700 text-white">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
          </SignedIn>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="w-full bg-[#1e293b] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-2">Why Choose TickeTron</h3>
          <p className="text-gray-400 mb-10">AI Powered Ticket Sorting for Efficient Support</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* You can replace these with ShadCN Cards or custom components */}
            <div className="p-6 bg-[#0f172a] rounded-lg shadow border border-gray-800">
              <h4 className="text-lg font-semibold mb-2">Smart Categorization</h4>
              <p className="text-gray-400 text-sm">Automatically tag tickets using AI understanding.</p>
            </div>
            <div className="p-6 bg-[#0f172a] rounded-lg shadow border border-gray-800">
              <h4 className="text-lg font-semibold mb-2">Effortless Assignment</h4>
              <p className="text-gray-400 text-sm">Route tickets to the right department in real-time.</p>
            </div>
            <div className="p-6 bg-[#0f172a] rounded-lg shadow border border-gray-800">
              <h4 className="text-lg font-semibold mb-2">Summarized Context</h4>
              <p className="text-gray-400 text-sm">Get concise AI-generated summaries for quicker actions.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
