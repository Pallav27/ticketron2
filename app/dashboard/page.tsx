import { UserButton } from "@clerk/nextjs";
import IssueAnalyzer from "@/components/IssueAnalyzer";
import TicketList from "@/components/TicketList";

export default function Dashboard() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <UserButton />
      </div>
      <IssueAnalyzer />
      <TicketList userId={""} />
      {/* Replace with actual user ID from Clerk or context */}
    </div>
  );
}
