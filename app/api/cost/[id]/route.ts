import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";
const moment = require('moment');
import 'moment/locale/fr';
export async function DELETE( req: Request, { params }: { params: { id: any } }) {
  try {
    const id = params.id 
    
   
    const data = await prisma.trajet.delete({
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
