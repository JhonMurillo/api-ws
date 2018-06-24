'use strict'

const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('api:ws')
const asyncify = require('express-asyncify')
// const auth = require('express-jwt')
const repository = require('./repository')
const joi = require('joi')
const multer = require('multer')
const path = require('path')
const uuidv4 = require('uuid/v4')
const { schemaDocument } = require('./validate/schema')
const api = asyncify(express.Router())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filepath = path.join('public', path.sep, 'uploads')
    cb(null, filepath)
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

api.get('/all', async (req, res, next) => {
  try {
    const documents = await repository.getDocuments()
    res.send(documents)
  } catch (error) {
    console.log(`Error, ${chalk.red(error)}`)
    return next(error)
  }
})

api.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file || req.file.fieldname !== 'file') {
      return next(new Error(`not found field`))
    }
    const doc = req.file
    doc.extname = path.extname(doc.originalname)

    joi.validate(doc, schemaDocument, { allowUnknown: true }, (err, value) => {
      if (err) {
        return next(err)
      }
    });
    const document = await repository.saveDocument(doc)
    res.send(`Document Saved! ${document} and uuud ${doc.uuid}`)
  } catch (error) {
    console.log(`Error, ${chalk.red(error)}`)
    return next(error)
  }
})

api.get('/download/:uuid', async (req, res, next) => {
  try {
    const { uuid } = req.params
    if (!uuid) {
      return next(new Error(`bad request`))
    }
    const document = await repository.getDocumentByUuid(uuid)
    res.download(document.path, document.originalname);
  } catch (error) {
    console.log(`Error, ${chalk.red(error)}`)
    return next(error)
  }
})

module.exports = api
