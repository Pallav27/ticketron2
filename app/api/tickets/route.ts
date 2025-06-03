import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import Ticket from "@/models/Ticket";
import { NextResponse } from "next/server";

// GET - fetch user tickets
export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  await connectToDatabase();
  const tickets = await Ticket.find({ userId }).sort({ createdAt: -1 });

  return NextResponse.json(tickets);
}

// POST - save a new ticket
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const data = await req.json();
  const { category, points, urgency, department } = data;

  await connectToDatabase();
  const ticket = await Ticket.create({ userId, category, points, urgency, department });

  return NextResponse.json(ticket);
}
