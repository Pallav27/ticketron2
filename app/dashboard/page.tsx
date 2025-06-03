import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import IssueAnalyzer from "@/components/IssueAnalyzer";
import TicketList from "@/components/TicketList";
import { Card, CardContent } from "@/components/ui/card";

export default async function Dashboard() {
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top right user icon */}
        <div className="flex justify-end">
          <UserButton />
        </div>

        {/* Issue Analyzer Input and Submit */}
        <Card className="bg-gray-900 text-white shadow rounded-2xl">
          <CardContent className="p-6">
            <IssueAnalyzer />
          </CardContent>
        </Card>

        {/* Two cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-900 text-white shadow rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Ticket</h2>
              <TicketList userId={userId ?? ""} />
            </CardContent>
          </Card>

          <Card className="bg-gray-900 text-white shadow rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">All Your Tickets</h2>
              <TicketList userId={userId ?? ""} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
