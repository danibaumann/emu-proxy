import express from 'express'
const router = express.Router()
import { getStats, getSmlStats } from '../controllers/stats.js'

router.get('/', getStats)

router.get('/wirkleistung', getSmlStats)

export default router
