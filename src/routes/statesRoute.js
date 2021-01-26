import express from 'express'
const router = express.Router()
import { getStats } from '../controllers/stats.js'

router.get('/', getStats)

export default router
