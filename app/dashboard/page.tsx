"use client";

import React, { useRef } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import IssueAnalyzer from "@/components/IssueAnalyzer";
import TicketList from "@/components/TicketList";
import { Card, CardContent } from "@/components/ui/card";

// Import categoryColors from the new file if you need it here
// import { categoryColors } from "@/lib/categoryColors";

export default function Dashboard() {
  const ticketListRef = useRef<{ refresh: () => void } | null>(null);
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
