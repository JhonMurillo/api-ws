'use strict'

const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('api:ws')
const api = express.Router()

api.get('/test', (req, res, next) => {
  debug(`Request successful, ${chalk.green('Endpoint Worked!')}`)
  res.send('Endpoint Worked!')
})

module.exports = api
