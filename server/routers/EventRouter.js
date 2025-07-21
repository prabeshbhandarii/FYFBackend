import express from 'express'
import { createEvent, getAllEvents, getRelevantEvents } from '../controllers/EventController.js'
const router = express.Router()

router.get('/', getAllEvents)    //use filter to get relevant events

router.get('/:location', getRelevantEvents)

router.post('/create', createEvent)

export default router