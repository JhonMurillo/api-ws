'use strict'

const joi = require('joi')

const schemaDocument = joi.object().keys({
  destination: joi.string().required(),
  encoding: joi.string().required(),
  extname: joi.string().required(),
  fieldname: joi.string().required(),
  mimetype: joi.string().required(),
  originalname: joi.string().required(),
  path: joi.string().required(),
  size: joi.number().required(),
  uuid: joi.string().required()
})

module.exports = {
  schemaDocument
}
