"use client";

import React, { useRef } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import IssueAnalyzer from "@/components/IssueAnalyzer";
import TicketList from "@/components/TicketList";
import { Card, CardContent } from "@/components/ui/card";

export const categoryColors: Record<string, string> = {
  "IT Support": "bg-blue-500",
  "Human Resources (HR)": "bg-pink-500",
  "Finance": "bg-yellow-500",
  "Operations": "bg-green-500",
  "Customer Service": "bg-orange-500",
  "Engineering": "bg-purple-500",
  "Marketing": "bg-red-400",
  "Legal": "bg-indigo-600",
  "Sales": "bg-emerald-500",
  "Product Management": "bg-sky-500",
  "Quality Assurance (QA)": "bg-lime-500",
  "Facilities": "bg-zinc-500",
  "Procurement": "bg-rose-500",
  "Security": "bg-cyan-600",
  "Other": "bg-gray-500",
};

export default function Dashboard() {
  const ticketListRef = useRef<any>(null);
  const { user } = useUser();

  const handleNewTicket = () => {
    ticketListRef.current?.refresh?.();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">
            TICKET<span className="text-green-400">TRON</span>
          </h1>
          <UserButton />
        </div>

        <Card className="backdrop-blur-xl bg-white/10 border border-white/10 shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <IssueAnalyzer onNewTicket={handleNewTicket} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TicketList ref={ticketListRef} userId={user.id} />
        </div>
      </div>
    </div>
  );
}
