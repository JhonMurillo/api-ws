'use strict'

const joi = require('joi')

const schemaDocument = joi.object().keys({
  name: joi.string().required(),
  extname: joi.string().required(),
  data: joi.string().required()
})

module.exports = {
  schemaDocument
}
