import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
const moment = require('moment');
import 'moment/locale/fr';
export async function POST(req: NextRequest) {
  const { sellingId, itineraryId } = await req.json();
    
    const itinerary = await prisma.itinerary.findFirstOrThrow({
        where: {id: itineraryId}
    })
    moment.locale('fr');
    const time = moment().format('LT')
    var departureTime = time
    const data = await prisma.trajet.create({
        
        data:{
            sellingId,
            departureTime,
            distance: itinerary.distance
        },
        include:{
            Controls: true,
            Tickets: true
          }
            
    })

    if (data) {
      return NextResponse.json({ data}, { status: 200 });

    } else {
      return NextResponse.json({ message: 'This device does not exist..' }, { status: 403 }); 


    }
  
}
