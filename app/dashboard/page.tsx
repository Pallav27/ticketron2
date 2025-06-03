import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import IssueAnalyzer from "@/components/IssueAnalyzer";
import TicketList from "@/components/TicketList";

export default async function Dashboard() {
  const { userId } = await auth();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <UserButton />
      </div>
      <IssueAnalyzer />
      <TicketList userId={userId ?? ""} />
    </div>
  );
}
