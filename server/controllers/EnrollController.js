import prisma from "../utils/PrismaClient.js"
import { z } from "zod"

const enrollInEventSchema = z.object({
    userId: z.string().min(1, 'User ID is required'),
    eventId: z.number().int().positive('Event ID must be a positive integer'),
    enrolledAt: z.preprocess((arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg), z.date()),
})

export const enrollInEvent = async (req, res) => {
    try {
        const body = await req.body;
        const validateEnrollment = enrollInEventSchema.safeParse(body);
        if(!validateEnrollment.success){
            return res.status(400).json({
                message: 'Invalid enrollment data',
                error: validateEnrollment.error
            })
        }

        const { userId, eventId, enrolledAt } = validateEnrollment.data;
        const enrollement = await prisma.enrollment.create({
            data: {
                userId,
                eventId,
                enrolledAt: enrolledAt || new Date()
            }
        })
        return res.status(201).json({
            message: 'Enrolled in event successfully',
            data: enrollement
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error enrolling in event',
            error: error
        })
    }
}