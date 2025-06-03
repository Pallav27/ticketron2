import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import  Ticket  from "@/models/ticket";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  await connectToDatabase();
  const tickets = await Ticket.find({ userId }).sort({ createdAt: -1 });

  return NextResponse.json(tickets);
}
