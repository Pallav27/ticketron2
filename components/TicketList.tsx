"use client";

import React, { useEffect, useState } from "react";

interface Ticket {
  _id: string;
  userId: string;
  email: string;
  content?: string | null;
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
        const res = await fetch(`/api/tickets?userId=${encodeURIComponent(userId)}`);
        if (!res.ok) throw new Error("Failed to fetch tickets");
        const data = await res.json();
        setTickets(data.tickets || []);
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
          {(ticket.content && typeof ticket.content === "string"
            ? ticket.content.split("Category:").slice(1)
            : []
          ).map((entry, index) => {
            const block = `Category:${entry}`;
            const categoryMatch = block.match(/Category:\s*(.*)/);
            const departmentMatch = block.match(/Department:\s*(.*)/);
            const urgencyMatch = block.match(/Urgency:\s*(.*)/);
            const pointsMatch = block.match(/Points:\s*([\s\S]*?)Urgency:/);

            const category = categoryMatch ? categoryMatch[1].trim() : "";
            const department = departmentMatch ? departmentMatch[1].trim() : "";
            const urgency = urgencyMatch ? urgencyMatch[1].trim() : "";
            const pointsRaw = pointsMatch ? pointsMatch[1].trim() : "";

            const points = pointsRaw
              ? pointsRaw
                  .split("\n")
                  .map((p) => p.replace(/^\-\s*/, "").trim())
                  .filter(Boolean)
              : [];

            return (
              <div key={index} className="mb-4 border-b pb-2">
                <h3 className="font-semibold">Category: {category}</h3>
                <p>Department: {department}</p>
                <p>Urgency: {urgency}</p>
                <ul className="list-disc list-inside ml-4">
                  {points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
