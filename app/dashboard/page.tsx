import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
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

export default async function Dashboard() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Topbar */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-yellow-400 drop-shadow-md">
            TICKET<span className="text-white">TRON</span>
          </h1>
          <UserButton />
        </div>

        {/* Analyzer Section */}
        <Card className="bg-[#111827] text-white shadow-lg rounded-2xl border-none">
          <CardContent className="p-6">
            <IssueAnalyzer />
          </CardContent>
        </Card>

        {/* Tickets Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TicketList userId={userId ?? ""} />
        </div>
      </div>
    </div>
  );
}
