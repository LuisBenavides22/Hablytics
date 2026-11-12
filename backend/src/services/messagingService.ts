import twilio from "twilio";
import { Twilio } from "../config/twilio.js";
import { randomInt } from "node:crypto";

interface Codes {
    code : string;
    expiresAt : Date;
}

const pendingCodes = new Map<string, Codes>();

const client = twilio(Twilio.apiKey, Twilio.apiSecret, {
     ...(Twilio.accountSID !== undefined && { accountSid: Twilio.accountSID }),
 });

export const SMS = async (number : string) => {

    const verificationCode = randomInt(100000, 1000000);
    const code = String(verificationCode);
   
    await client.messages.create({
        body: code,
        from: "234783",
        to : number
    });

    return code;
}

export const textMessager = async (phoneNumber : string) => {

    const code = await SMS(phoneNumber)

    pendingCodes.set(phoneNumber, {
        code : String(code),
        expiresAt : new Date(Date.now() + 60 * 1000)
    });

}

export const verifyLoginCode =(phoneNumber : string, code : string) => {

    const pending = pendingCodes.get(phoneNumber);

    if (!pending || pending.expiresAt.getTime() < Date.now() || code !== pending.code){
        return false;
    }

    pendingCodes.delete(phoneNumber);
    return true;
}


