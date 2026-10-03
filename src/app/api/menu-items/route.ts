import connectDB from "@/database/db";
import MenuItem from "@/database/itemSchema";

/**
 * Example GET API route
 * @returns {message: string}
 */
export async function GET() {
  await connectDB();
  const items = await MenuItem.find();
  return Response.json({ items });
}

// export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
//   await connectDB();
//   const { id } = await params
//   const items = await MenuItem.findById(id)
//   return Response.json({ items });
// }

export async function POST(request: Request) {
  await connectDB();
  const data = await request.json();
  const newItem = await MenuItem.create(data);

  await newItem.save();
  return Response.json({ data });
}

export async function DELETE(request: Request) {
  console.log(request);
  return Response.json({ success: true });
}
