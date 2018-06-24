'use strict'

const db = require('./db')
const util = require('./utils')
const moment = require('moment')

const repository = {}

repository.saveDocument = document => {
  document.dateCreated = moment().format('MMMM/DD/YYYY, h:mm:ss a')
  return db.ref('documents').push(document)
}

repository.getDocuments = async () =>  {
  const documents = util.snapshotToArray (await db.ref('documents').once('value'))
  return documents
}

repository.getDocumentByUuid = async (uuid) =>  {
  const document = util.snapshotToArray (await db.ref(`documents`).orderByChild("uuid").equalTo(uuid).once('value')).shift()
  return document
}

repository.getDocumentByRef = async (ref) =>  {
  const document = util.snapshotToArray (await db.ref(`documents/${ref}`).once('value')).shift()
  return document
}

module.exports = repository
