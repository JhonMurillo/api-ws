'use strict'

const db = require('./db')
const uuidv4 = require('uuid/v4');

const repository = {}

repository.saveDocument = document => {
    document = {
        nameFile: 'nameFile',
        extension: 'png',
        uuid: uuidv4(),
        dateCreated: moment().format('MMMM/DD/YYYY, h:mm:ss a'),
    }
    return db.ref('documents').push(document)
}

module.exports = repository
