import express from 'express'
const router = express.Router()
import { ping, version } from '../controllers/services.js'

router.get('/ping', ping)

router.get('/version', version)

export default router
