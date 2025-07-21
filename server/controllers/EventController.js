import prisma from '../utils/PrismaClient.js'
import { z } from 'zod'


const eventSchema = z.object({
    title: z.string().min(1, 'title is required'),
    description: z.string().optional(),
    date: z.preprocess((arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg), z.date()),
    location: z.string().min(1, 'Location is required'),
    categoryId: z.number(),
    userId: z.string().min(1, 'User ID is required'),
})

export const createEvent = async (req, res) => {
    // Validate request body
    if (!req.body) {
        return res.status(400).json({
            message: 'Event data is required'
        })
    }
    const validateEvent = eventSchema.safeParse(req.body)
    if (!validateEvent.success) {
        return res.status(400).json({
            message: 'Invalid event data',
            errors: validateEvent.error
        })
    }
    const { title, description, date, location, categoryId, userId } = validateEvent.data
    try {
        
        const event = await prisma.event.create({
            data: {
                title,
                description, 
                date,
                location,
                categoryId,
                userId
            }
        })
        if (!event) {
            return res.status(400).json({
                message: 'event creation failed'
            })
        }
       return res.status(201).json({
            message: 'event created successfully',
            data: event
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating event',
            error: error.message
        })
    }
}

export const getAllEvents = async (req, res)=>{
    try {
        const events = await prisma.event.findMany({})
        if(!events || events.length === 0) {
            return res.status(404).json({
                message: 'No Events found'
            })
        }
        return res.status(200).json({
            message: 'Events fetched successfully',
            data: events
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching events',
            error: error.message
        })
    }
}

export const getRelevantEvents = async (req, res)=>{
    // later on filter events based on distance and locations.
    try {
        const location = req.params.location;
        const events = await prisma.event.findMany({
            where: { location: location }
        })
        if(!events || events.length === 0) {
            return res.status(404).json({
                message: 'No Events found'
            })
        }

        return res.status(200).json({
            message: 'Events fetched successfully',
            data: events
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching events',
            error: error.message
        })
    }
}

