'use strict'

const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('api:ws')
const asyncify = require('express-asyncify')
// const auth = require('express-jwt')
const repository = require('./repository')
// const joi = require('joi')
const multer = require('multer')
const path = require('path')
const uuidv4 = require('uuid/v4')
// const { schemaDocument } = require('./validate/schema')
const api = asyncify(express.Router())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    file.uuid = uuidv4()
    cb(null, file.uuid + '&&' + file.originalname)
  }
})
const upload = multer({ storage: storage })

api.get('/', (req, res, next) => {
  debug(`Request successful, ${chalk.green('Endpoint Worked!')}`)
  res.send('Endpoint Worked!')
})

api.get('/test', (req, res, next) => {
  debug(`Request successful, ${chalk.green('Endpoint Worked!')}`)
  res.send('Endpoint Worked!')
})

api.post('/save', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file || req.file.fieldname !== 'file') {
      return next(new Error(`not found field`))
    }
    const doc = req.file
    doc.extname = path.extname(doc.originalname)

    /* joi.validate(doc, schemaDocument, { allowUnknown: true }, (err, value) => {
            if(err){
                return next(err)
            }
        }); */
    const document = await repository.saveDocument(doc)
    res.send(`Document Saved! ${document}`)
  } catch (error) {
    console.log(`Error, ${chalk.red(error)}`)
    return next(error)
  }
})

module.exports = api
