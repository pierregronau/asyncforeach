'use strict'
module.exports = function asyncForEach (arr, data, finish) {
  // allow for optional data API
  if (!finish) {
    finish = data
  }

  const tasks = arr
  let completed = 0
  let hasCalled = false
  let results = []

  tasks.forEach((task, index, array) => {
    let taskHasCalled = false
    // cb that will be called by user function
    const cb = (err, res) => {
      // bail early if we happened to have called already
      if (hasCalled) {
        return
      }

      if (taskHasCalled) {
        return // or thow
      }

      // return with the early error
      if (err) {
        hasCalled = true
        return finish(err)
      }
      taskHasCalled = true

      // results will be returned as array for
      // caller to handle. Imagine multiple API calls with none 200 returns
      results[index] = res
      // of end of list is reached, return
      if (++completed === tasks.length) {
        hasCalled = true
        return finish(null, results)
      }
    }
    // allow for optional data API
    task(task, index, array, !finish ? cb : data, cb)
  })
}
