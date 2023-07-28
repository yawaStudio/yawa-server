import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";
const moment = require('moment');
import 'moment/locale/fr';
export async function GET( req: Request, { params }: { params: { id: any } }) {
  try {
    const id = params.id 
   
    const data = await prisma.selling.findFirstOrThrow({
        where: {
            id,
        },
        include:{
          trajet: true,
          device: true,
          itinerary: {include:{rates:true}},
        }
    })
    return NextResponse.json({ data }, {status: 200});
    
  } catch (error) {
  const message = 'error'
    return NextResponse.json({ message }, {status: 404}); 
  }
}
