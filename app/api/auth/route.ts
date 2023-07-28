import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  const { device, password } = await req.json();
  console.log(device, password)
  
    const data = await prisma.deviceAttribution.findFirst({
        where: {
          deviceCode: device,
          code: password,
          isActiveted:true
        },
        include: {
            reseau: {include:{
              Itinerary:{
                include: {
                  rates: true,
                  coordinates:true
              }}, 
              Rubrics: true, 
              Subscription:true,
              Controller: true,

            }},
            Companie: true,
            device:true,
            operator: true,
            vehicule: {
              include:{Seller:true, Driver: true}
            },
             
        },
    })

    if (data) {
      return NextResponse.json({ data}, { status: 200 });

    } else {
      return NextResponse.json({ message: 'This device does not exist..' }, { status: 403 }); 


    }
  
}
