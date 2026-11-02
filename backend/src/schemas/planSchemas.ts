import { z} from "zod";

export const Plan = z.object({
    title : z.string().trim(),
    category : z.enum(["technical", "strategic", "soft"]),
    week : z.number().int().min(1).max(4),
    description : z.string().trim()
});

export const PlanList = z.array(Plan).min(8).max(12);

export const ExtendPlan = z.object({
    days : z.number().int().min(1, "Extend by at least 1 day").max(30, "Extend by at most 30 days")
});
