"use client";

import React, { useEffect, useState } from "react";

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

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!tickets.length) return <p>No tickets found.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Tickets</h2>
      {tickets.map((ticket) => (
        <div key={ticket._id} className="mb-4 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold">Category: {ticket.category}</h3>
          <p>Department: {ticket.department}</p>
          <p>Urgency: {ticket.urgency}</p>
          <ul className="list-disc list-inside ml-4">
            {ticket.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-2">
            Created at: {new Date(ticket.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
