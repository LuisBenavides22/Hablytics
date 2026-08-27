import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { stripeClient } from "../config/stripe.js";

export class BillingController {

    async createCheckout(req: Request, res: Response) {

        try {

            const { plan } = req.body;

            if (!req.userId) {
                return res.status(400).json({ error : "Authentication Required"});
            }

            const user = await prisma.user.findUnique({
                where : { id : req.userId}
            });

            if (!user) {
                return res.status(400).json({ error : "User does not exist"});
            }

            let price;

            if (plan == "PRO") {
                price = process.env.STRIPE_PRO_PRICE;
            } else {
                price = process.env.STRIPE_ELITE_PRICE;
            }

            if (plan != "PRO" && plan != "ELITE") {
                return res.status(403).json({ error : "Invalid Plan."});
            }
            
            const customerId = user.stripeCustomerId;

            if (!customerId) {
                const customer = await stripeClient.customers.create({
                    email : user.email
                });

                await prisma.user.update({
                    where : { id: user.id },
                    data : { stripeCustomerId : customer.id }
                });
            }

        
            const session = await stripeClient.checkout.sessions.create({
                

            })


        } catch (error) {   
            console.error("Error creating checkout session", error);
            res.status(500).json({ error : "Internal Server Error"});
        }

    }

    async createPortal(req: Request, res: Response) {

        try {



            


















        } catch (error) {

        }
    }

    async handleWebHooks(req: Request, res: Response){

        try {























        } catch (error){

        }
    }
}

export default new BillingController();