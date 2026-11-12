import twilio from "twilio";

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const apiSecret = process.env.TWILIO_API_SECRET;
const apiKey = process.env.TWILIO_API_KEY;

export const Twilio = {
    accountSID,
    apiKey,
    apiSecret
}