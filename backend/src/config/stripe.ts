import Stripe from "stripe";
import 'dotenv/config';

const secret = process.env.STRIPE_SECRET;

if (!secret) {
    throw new Error("Missing Stripe API Key");
}

export const stripeClient = new Stripe(secret);