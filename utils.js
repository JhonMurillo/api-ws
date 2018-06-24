'use strict'

const utilsFunc = {}

utilsFunc.snapshotToArray = (snapshot) => {
  let returnArr = []

  snapshot.forEach(function (childSnapshot) {
    let item = childSnapshot.val()
    item.key = childSnapshot.key
    returnArr.push(item)
  })

  return returnArr
}

module.exports = utilsFunc
