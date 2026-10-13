import express from "express"
const router = express.Router()

import { getRes } from "../controllers/geminiController.js"

router.post('/ask', getRes)


export default router