import connectDB from "@/database/db";
import { NextResponse } from "next/server";
import { mockMenuItems } from "@/data/mockMenuItems";
import MenuItem from "@/database/menuItemSchema";

/**
 * Example GET API route
 * @returns {message: string}
 */
export async function GET() {
  await connectDB();
  const menuItems = await MenuItem.find();
  return Response.json({ menuItems });
}

export async function POST(request: Request) {
  await connectDB(); //connect to db
  const data = await request.json();

  const newItem = await MenuItem.create(data);
  return Response.json({ data });
}

export async function DELETE(request: Request) {
  console.log(request);
  return Response.json({ success: true });
}
