import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const data = await prisma.user.findMany();
    return NextResponse.json({ data }, {status: 200});
    
  } catch (error) {
  const message = 'error'
    return NextResponse.json({ message }, {status: 404}); 
  }
}

export async function POST(request: Request) {}
 
export async function PUT(request: Request) {}
 
export async function DELETE(request: Request) {}