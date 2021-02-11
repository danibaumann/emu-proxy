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
  log.debug(hosts)

  if (!hosts || hosts.length === 0) {
    return res.status(500).json('No Hosts provided in environment')
  }

  log.info('will fetch latest data')
  const dataToReturn = []
  for await (const h of hosts) {
    log.debug(`Will query host: ${h}`)
    let i = 0
    const data = {}
    for await (const v of EmuStat) {
      const id = v.id
      log.debug(`Fetching Data: ${id}`)
      try {
      } catch (err) {
        log.error(err.message)
      }
      const response = await axios.get(`http://${h}/${v.register}`)
      data[id] = { value: response.data, unit: v.unit, label: v.label }
      // tmpArray.push({
      //   id:,
      // })
      i++
    }
    dataToReturn.push({ ip: h, data })
  }

  log.debug(dataToReturn)
  res.status(200).json(dataToReturn)
})

const getSmlStats = asyncHandler(async (req, res, next) => {
  const hosts = process.env.HOSTS.split(',')
  log.debug(hosts)

  if (!hosts || hosts.length === 0) {
    return res.status(500).json('No Hosts provided in environment')
  }

  log.info('will fetch latest data')
  const dataToReturn = []
  for await (const h of hosts) {
    log.debug(`Will query host: ${h}`)
    let i = 0
    const data = {}
    for await (const v of EmuStat) {
      if (v.id === 'AktuelleWirkLeistungTotal') {
        const id = v.id
        log.debug(`Fetching Data: ${id}`)
        try {
        } catch (err) {
          log.error(err.message)
        }
        const response = await axios.get(`http://${h}/${v.register}`)
        data[id] = { value: response.data, unit: v.unit, label: v.label }
        // tmpArray.push({
        //   id:,
        // })
        i++
      } else {
        return
      }
    }
    dataToReturn.push({ ip: h, data })
  }

  log.debug(dataToReturn)
  res.status(200).json(dataToReturn)
})

export { getStats, getSmlStats }
