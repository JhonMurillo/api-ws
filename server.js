'use strict'

const http = require('http')
const express = require('express')
const api = require('./api-url')
const debug = require('debug')('api:ws')
const chalk = require('chalk')
const app = express()

const port = process.env.PORT || 4000
const server = http.createServer(app)
app.use('/api', api)

app.use((err, req, res, next) => {
  debug(`Error ${err.message}`)
  if (err.message.match(/not found/)) {
    res.status(404).send({ error: err.message })
  }
  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandleRejection', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[api-ws]')} server listening on port ${port}`)
})

module.exports = server
