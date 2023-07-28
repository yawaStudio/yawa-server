import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
const moment = require('moment');
import 'moment/locale/fr';
export async function POST(req: NextRequest) {
  const { sellingId, tripId, paymentMethodeId, walletId, rateId} = await req.json();
    
    const rate = await prisma.rate.findFirstOrThrow({
        where: {id: rateId}
    })
    moment.locale('fr');
    const time = moment().format('LT')
    var startTime = time
    var newTime = moment().format('LT').add(1, 'hours');
    var uuid = Math.floor(1000 + Math.random() * 9000).toString();
        var code = 'T' + uuid
    const data = await prisma.ticket.create({
        
        data:{
          code,
            sellingId,
            startTime,
            price: rate.price,
            name: rate.name,
            validUntil: newTime,
            tripId,
            rateId,
            paymentMethodeId,
            endTime: newTime
        },
        include:{
            trip: true,
            selling: true,
            paymentMethode: true,
            rate: true,
            wallet: true
          }
            
    })

    if (data) {
      return NextResponse.json({ data}, { status: 200 });

    } else {
      return NextResponse.json({ message: 'This device does not exist..' }, { status: 403 }); 


    }
  
}
