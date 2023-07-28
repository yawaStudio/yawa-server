import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
const moment = require('moment');
import 'moment/locale/fr';
export async function POST(req: NextRequest) {
  const { sellingId, rubricsId , amount} = await req.json();
    
   
    
    var costAmount = Number(amount)
    const data = await prisma.costs.create({
        
        data:{
            sellingId,
            amount: costAmount,
            rubricsId
        },
            
    })

    if (data) {
      return NextResponse.json({ data}, { status: 200 });

    } else {
      return NextResponse.json({ message: 'This device does not exist..' }, { status: 403 }); 


    }
  
}
