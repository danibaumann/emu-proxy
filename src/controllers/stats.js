import EmuStat from '../models/State.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import { getLogger } from '../utils/logger.js'

import asyncHandler from 'express-async-handler'
import axios from 'axios'

const log = getLogger()

// @desc    getStats
// @route   POST /v1/stats
// @access  Public
const getStats = asyncHandler(async (req, res, next) => {
  const hosts = process.env.HOSTS.split(',')
  let data
  log.debug(hosts)
  const valuesToFetch = Object.values(EmuStat)
  const keyForArray = Object.keys(EmuStat)
  log.debug(valuesToFetch)

  const dataPoint = 4200

  if (!hosts || hosts.length === 0) {
    return res.status(500).json('No Hosts provided in environment')
  }

  log.info('will fetch latest data')
  const dataToReturn = []
  for await (const h of hosts) {
    let hostData = {}
    log.debug(`Will query host: ${h}`)
    let i = 0
    for await (const v of valuesToFetch) {
      const key = keyForArray[i]
      log.debug(`Fetching Data: ${key}`)
      const response = await axios.get(`http://${h}/${v}`)
      hostData[key] = response.data
      i++
    }
    dataToReturn.push(hostData)
  }

  log.debug(dataToReturn)
  res.status(200).json(dataToReturn)
})

export { getStats }
