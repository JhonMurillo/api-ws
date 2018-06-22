'use strict'

const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('api:ws')
const asyncify = require('express-asyncify')
const auth = require('express-jwt')
const repository = require('./repository')
const api = asyncify(express.Router())

api.get('/test', (req, res, next) => {
  debug(`Request successful, ${chalk.green('Endpoint Worked!')}`)
  res.send('Endpoint Worked!')
})

api.post('/save', async  (req, res, next) => {
    /*const { file } = req.body
    console.log(req.body.file)*/
  try {
    const document = await repository.saveDocument({})
    res.send(`Document Saved! ${document}`)
  } catch (error) {
    console.log(`Error, ${chalk.red(error)}`)
    return next(error)
  }
})

module.exports = api
