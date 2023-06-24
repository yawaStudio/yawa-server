import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET( request: Request, { params }: { params: { id: any } }) {
  try {
    const id = params.id 
    const data = await prisma.user.findUnique({
        where: {
            id,
        },
    })
    return NextResponse.json({ data }, {status: 200});
    
  } catch (error) {
  const message = 'error'
    return NextResponse.json({ message }, {status: 404}); 
  }
}
