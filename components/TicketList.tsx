"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Department color mapping (not category!)
const departmentColors: Record<string, string> = {
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

interface Ticket {
  _id: string;
  userId: string;
  category: string;
  points: string[];
  urgency: string;
  department: string;
  createdAt: string;
}

export default function TicketList({ userId }: { userId: string }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/tickets");
        if (!res.ok) throw new Error("Failed to fetch tickets");
        const data = await res.json();
        setTickets(data || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error");
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchTickets();
  }, [userId]);

  if (loading) return <p className="text-gray-300">Loading tickets...</p>;
  if (error) return <p className="text-red-500 font-semibold">Error: {error}</p>;
  if (!tickets.length) return <p className="text-gray-400">No tickets found.</p>;

  return (
    <>
      {tickets.map((ticket) => {
        const colorClass = departmentColors[ticket.department] || "bg-gray-500";

        return (
          <Card
            key={ticket._id}
            className="bg-[#1f2937] text-white rounded-2xl border-none shadow-md hover:shadow-xl transition-shadow"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">{ticket.category}</h2>
                <span className={`text-xs px-3 py-1 rounded-full text-white ${colorClass}`}>
                  {ticket.department}
                </span>
              </div>

              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 ml-2">
                {ticket.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              <div className="flex justify-between items-center text-xs text-gray-400 pt-2">
                <span>Urgency: {ticket.urgency}</span>
                <span>{new Date(ticket.createdAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
