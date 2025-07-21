import express from "express";
const router = express.Router();
import { enrollInEvent } from "../controllers/EnrollController.js";

router.post("/", enrollInEvent)

export default router;