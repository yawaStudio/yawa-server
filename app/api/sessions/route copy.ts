import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
const moment = require("moment");
import "moment/locale/fr";
const crypto = require("crypto");
const axios = require("axios");

export async function POST(req: NextRequest) {
  const { sellerId, driverId, itineraryId, deviceId } = await req.json();
  moment.locale("fr");
  const time = moment().format("LT");
  const date = moment().format("L");
  console.log("date: ", date, "time ", time);
  const device = await prisma.deviceAttribution.findFirstOrThrow({
    where: {
      id: deviceId,
    },
  });
  var type = "Vente";
  const save = await prisma.selling.create({
    data: {
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
      reseauId: device.reseauId,
    },
  });

  if (save) {
    const apiUrl = "https://lampush-json.lafricamobile.com/sms/push";

    const smsData = {
      accountid: "string",
      password: "xpasswordx",
      hmac: "fb4ec2c8c0b3bd8fa7050b260cbbdd704e154a8738df9473a38193aff4fe364a",
      start_date: "20014-12-12", // default=today
      start_time: "13:00", // default='00:00'
      stop_time: "string",
      userdata: "User Data Multiple Sent",
      sender: "API_LAMSMS",
      ret_id: "Push_1",
      ret_url:
        "https://lampush-tls.lafricamobile.com/peps_sample/RetrieveStatus.php",
      priority: "2",
      text: "Hello world!",
      to: [
        {
          ret_id_1: "2217723456789",
          ret_id_2: "2217723456789",
        },
      ],
    };
    const message = 'Hello, world!';
    const secretKey = 'my-secret-key';
    const hmacValue = generateHMAC(message, secretKey);
    console.log('HMAC:', hmacValue);
    axios
      .post(apiUrl, smsData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response: { data: any; }) => {
        console.log(response.data);
      })
      .catch((error: { message: any; }) => {
        console.error(error.message);
      });
    return NextResponse.json({ save }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "This device does not exist.." },
      { status: 403 }
    );
  }
}

function generateHMAC(message: any, secretKey: any, algorithm = "sha256") {
  const hmac = crypto.createHmac(algorithm, secretKey);
  hmac.update(message);
  return hmac.digest("hex");
}
