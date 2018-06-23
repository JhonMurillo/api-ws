'use strict'

const db = require('./db')
const moment = require('moment')

const repository = {}

repository.saveDocument = document => {
  document.dateCreated = moment().format('MMMM/DD/YYYY, h:mm:ss a')
  return db.ref('documents').push(document)
}

module.exports = repository
