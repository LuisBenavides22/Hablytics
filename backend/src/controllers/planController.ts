import prisma from "../config/prisma.js";
import { Request, Response } from "express";
import { aiPlanService } from "../services/ai-plan-service.js";
import { ExtendPlan } from "../schemas/planSchemas.js";
import { Prisma } from "@prisma/client";

const CLAIM_TIMEOUT_MS = 2 * 60 * 1000;

export class planController {

    async generate(req: Request, res: Response) {

        try {

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication Required"});
            }

            const report = await prisma.report.findFirst({
                where : { userId : req.userId },

                select : {
                    id : true,
                    summary : true,
                    hiddenWins : true,
                    growthOpportunities : true
                },

                orderBy : {
                    createdAt : "desc"
                }
            });


            if (!report || !report.growthOpportunities){
                return res.status(422).json({ error : "Report ineligible for plan"});
            }

            const existing = await prisma.plan.findUnique({
                where : { reportId : report.id }
            });

            if (existing){

                const claimIsStale = existing.status === "GENERATING"
                    && Date.now() - existing.createdAt.getTime() > CLAIM_TIMEOUT_MS;

                if (claimIsStale){
                    await prisma.plan.deleteMany({ where : { id : existing.id, status : "GENERATING" }});
                } else if (existing.status === "GENERATING"){
                    return res.status(409).json({ error : "Plan is already being generated"});
                } else {
                    return res.status(200).json({ success : true, createdPlan : existing, alreadyExists : true});
                }
            }

            const claim = await prisma.plan.create({
                data : {
                    userId : req.userId,
                    reportId : report.id,
                    status : "GENERATING",
                    tasks : [],
                    endsAt : new Date()
                }
            });

            let createdPlan;

            try {

                const plan = await aiPlanService(JSON.stringify(report));

                const currentDay = new Date()
                const thirtyDays = new Date(currentDay);
                thirtyDays.setDate(thirtyDays.getDate() + 30);

                [, createdPlan] = await prisma.$transaction([

                    prisma.plan.updateMany({
                        where : { userId : req.userId, status : { in : ["ACTIVE", "EXPIRED"] }},

                        data : {
                            status: "INACTIVE"
                        }
                    }),

                    prisma.plan.update({
                        where : { id : claim.id },
                        data : {
                            status : "ACTIVE",
                            tasks : plan.map((task) => ({ ...task, done : false })),
                            startsAt : new Date(),
                            endsAt : thirtyDays
                        }
                    })
                ]);

            } catch (error) {
                await prisma.plan.deleteMany({ where : { id : claim.id, status : "GENERATING" }});
                throw error;
            }

            res.status(201).json({ success : true, createdPlan});


        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"){
                return res.status(409).json({ error : "A plan already exists for this report"});
            }

            console.error("Error generating plan", error);
            res.status(500).json({ error : "Error generating plan"});
        }
    }

    async getPlans(req: Request, res: Response) {

        try {

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication Required"});
            }

            const plans = await prisma.plan.findMany({
                where : { userId : req.userId, status : { not : "GENERATING" }},
                orderBy : { createdAt : "desc" }
            });

            return res.status(200).json({ success : true, plans });

        } catch (error) {
            console.error("Error fetching plans", error);
            return res.status(500).json({ error : "Error fetching plans"});
        }
    }

    async getActivePlan(req: Request, res: Response) {

        try {

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication Required"});
            }

            let plan = await prisma.plan.findFirst({
                where : { userId : req.userId, status : { in : ["ACTIVE", "EXPIRED"] }},
                orderBy : { createdAt : "desc" }
            });

            if (!plan){
                return res.status(404).json({ error : "No active plan"});
            }

            if (plan.status === "ACTIVE" && plan.endsAt.getTime() < Date.now()){
                plan = await prisma.plan.update({
                    where : { id : plan.id },
                    data : { status : "EXPIRED" }
                });
            }

            return res.status(200).json({ success : true, plan });

        } catch (error) {
            console.error("Error fetching active plan", error);
            return res.status(500).json({ error : "Error fetching active plan"});
        }
    }


    async toggleTask(req: Request, res: Response) {

        try {

            if (!req.userId) {
                return res.status(401).json({ error : "Authentication Required"});
            }

            const id = req.params.id as string;
            const index = Number(req.params.index);

            const plan = await prisma.plan.findFirst({
                where : { id, userId : req.userId }
            });

            if (!plan){
                return res.status(404).json({ error : "Plan not found"});
            }

            const tasks = plan.tasks as { done?: boolean }[];

            if (!Array.isArray(tasks) || !Number.isInteger(index) || index < 0 || index >= tasks.length){
                return res.status(400).json({ error : "Invalid task index"});
            }

            const updatedTasks = tasks.map((task, i) =>
                i === index ? { ...task, done : !task.done } : task
            );

            const updatedPlan = await prisma.plan.update({
                where : { id },
                data : { tasks : updatedTasks }
            });

            return res.status(200).json({ success : true, plan : updatedPlan });

        } catch (error) {
            console.error("Error toggling task", error);
            return res.status(500).json({ error : "Error updating task"});
        }
    }


    async deletePlanById(req: Request, res: Response){

        try {

            if (!req.userId){
                return res.status(401).json({ error : "Authentication Required"});
            }

            const { id } = req.params;

            if (typeof id !== "string" || !id){
                return res.status(400).json({ error : "Plan ID is Required"});
            }

            const plan = await prisma.plan.findUnique({
                where : { id,  userId: req.userId }
            });

            if (!plan){
                return res.status(404).json({ error : "Plan not found"});
            }

            const deletedPlan = await prisma.plan.delete({
                where : { id }
            });

            return res.status(200).json({ success : true, deletedPlan });

        } catch (error) {
            console.error("Error deleting plans", error);
            return res.status(500).json({ error : "Error deleting plans"});
        }
    }

    async markPlanDone(req : Request, res: Response){

        try {

            const id = req.params.id as string;
            const userId = req.userId;

            if (!userId){
                return res.status(401).json({ error : "Authentication Required"});
            }

            const plan = await prisma.plan.findFirst({
                where : { id , userId }
            });

            if (!plan){
                return res.status(400).json({ error : "Plan doesnt exist"});
            }

            if (plan.status === "FINISHED"){
                return res.status(409).json({ error : "Plan is already finished"});
            }

            const updatePlan = await prisma.plan.update({
                where : { id, userId },

                data : {
                    status : "FINISHED",
                    endsAt : new Date(),
                    updatedAt : new Date()
                }
            });

            res.status(200).json({ success : true, plan : updatePlan});


        } catch (error){
            console.error("Mark Task Done", error);
            res.status(500).json({ error : "Error marking task as done"})
        }
    }


    async extendPlan(req : Request, res: Response){

        try {

            const id = req.params.id as string;
            const userId = req.userId;

            if (!userId){
                return res.status(401).json({ error : "Authentication Required"});
            }

            const parsed = ExtendPlan.safeParse(req.body);

            if (!parsed.success){
                return res.status(400).json({ error : parsed.error.issues[0]?.message ?? "Invalid input"});
            }

            const plan = await prisma.plan.findFirst({
                where : { id, userId }
            });

            if (!plan){
                return res.status(404).json({ error : "Plan not found"});
            }

            if (plan.status === "FINISHED" || plan.status === "INACTIVE" || plan.status === "GENERATING"){
                return res.status(409).json({ error : "Only active or expired plans can be extended"});
            }

            const base = new Date(Math.max(Date.now(), plan.endsAt.getTime()));
            base.setDate(base.getDate() + parsed.data.days);

            const updatedPlan = await prisma.plan.update({
                where : { id },
                data : {
                    status : "ACTIVE",
                    endsAt : base
                }
            });

            return res.status(200).json({ success : true, plan : updatedPlan });

        } catch (error){
            console.error("Error extending plan", error);
            res.status(500).json({ error : "Error extending plan"});
        }
    }

    
}

export default new planController();