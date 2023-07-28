import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";
const moment = require('moment');
import 'moment/locale/fr';
export async function POST( req: Request, { params }: { params: { id: any } }) {
  try {
    const id = params.id 
    
    moment.locale('fr');
  const time = moment().format('LT')
  var arrivalTime =time
  var duration = "1"
    const data = await prisma.trajet.update({
        where: {
            id,
        },
        data:{
          arrivalTime,
          isActivated: false,
          duration
        },
        include:{
          Controls: true,
          Tickets: true
        }
    })
    return NextResponse.json({ data }, {status: 200});
    
  } catch (error) {
  const message = 'error'
    return NextResponse.json({ message }, {status: 404}); 
  }
}
