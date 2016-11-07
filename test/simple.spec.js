const asyncForEach = require('../')
const test = require('tape')

test('returns asynchronously and array of objects and no error', function (t) {
  t.plan(3)
  const arr = []

  arr.push(function one (cb) {
    console.log('calling one')
    process.nextTick(() => {
      console.log('returning from one')
      return cb(null, {'one': 'one'})
    })
  })

  arr.push(function two (cb) {
    console.log('calling two')
    setTimeout(function () {
      console.log('returning from two')
      return cb(null, {'two': 'two'})
    }, 1000)
  })

  asyncForEach(arr, (err, res) => {
    t.equal(err, null)
    t.deepEqual(res[0], {'one': 'one'})
    t.deepEqual(res[1], {'two': 'two'})
  })
})
