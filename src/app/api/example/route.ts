import connectDB from "@/database/db";
import { NextResponse } from "next/server";
import { mockMenuItems } from "@/data/mockMenuItems";

/**
 * Example GET API route
 * @returns {message: string}
 */
export async function GET() {
  // await connectDB();
  return Response.json({ mockMenuItems });
}

export async function POST(request: Request) {
  const data = await request.json();
  return Response.json({ data });
}

export async function DELETE(request: Request) {
  console.log(request);
  return Response.json({ success: true });
}
