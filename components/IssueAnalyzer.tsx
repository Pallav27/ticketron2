"use client";

import React, { useState } from "react";

export default function IssueAnalyzer({
  onNewTicket,
}: {
  onNewTicket?: () => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function parseResult(text: string) {
    const categoryMatch = text.match(/Category:\s*(.*)/);
    const pointsMatch = text.match(/Points:\s*([\s\S]*?)Urgency:/);
    const urgencyMatch = text.match(/Urgency:\s*(.*)/);
    const departmentMatch = text.match(/Department:\s*(.*)/);

    const category = categoryMatch ? categoryMatch[1].trim() : "";
    const pointsRaw = pointsMatch ? pointsMatch[1].trim() : "";
    const points = pointsRaw
      ? pointsRaw
          .split("\n")
          .map((p) => p.replace(/^\-\s*/, "").trim())
          .filter(Boolean)
      : [];
    const urgency = urgencyMatch ? urgencyMatch[1].trim() : "";
    const department = departmentMatch ? departmentMatch[1].trim() : "";

    return { category, points, urgency, department };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Unknown error");

      setResult(data.result);

      const parsed = parseResult(data.result);
      await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          ...parsed,
        }),
      });

      if (onNewTicket) onNewTicket();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const parsed = result ? parseResult(result) : null;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">QUERY SORTER</h1>
      <h1 className="text-1xl font-bold mb-4 text-white">Gemini 2.0 Flash</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          rows={5}
          className="w-full p-2 border border-gray-300 rounded text-white"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your issue here..."
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Submit Issue"}
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">Error: {error}</p>}

      {parsed && (
        <div className="border p-4 rounded shadow text-white bg-gray-700">
          <h2 className="font-semibold text-lg mb-2">Category: {parsed.category}</h2>
          <h3 className="font-semibold mb-1">Department: {parsed.department}</h3>
          <h4 className="mb-2">
            Urgency: <span className="text-red-600">{parsed.urgency}</span>
          </h4>
          <ul className="list-disc list-inside space-y-1">
            {parsed.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
