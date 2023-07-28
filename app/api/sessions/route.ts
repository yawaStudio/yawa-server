import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
const moment = require('moment');
import 'moment/locale/fr';

export async function POST(req: NextRequest) {
  const { sellerId, driverId, itineraryId, deviceId } = await req.json();
  moment.locale('fr');
  const time = moment().format('LT')
  const date = moment().format('L')
  console.log('date: ', date, 'time ', time); 
  const device  = await prisma.deviceAttribution.findFirstOrThrow({
    where:{
      id: deviceId
    },
    
  })
   var type = 'Vente'
  const save = await prisma.selling.create({
    data:{
      type,
      sellerId,
      driverId,
      itineraryId,
      deviceId,
      startTime: time,
      sellingDate: date,
      vehiculeId: device.vehiculeId,
      CompanieId: device.CompanieId,
      operatorId: device.operatorId,
      reseauId: device.reseauId

    }
  })

 
  
    if (save) {
      return NextResponse.json({ save}, { status: 200 });

    } else {
      return NextResponse.json({ message: 'This device does not exist..' }, { status: 403 }); 


    }
  
}
