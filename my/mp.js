class MyPromise {
  constructor(exec) {
    this.state = 'pending'
    this.value = undefined

    this.successQueue = []
    this.failureQueue = []

    const resolve = () => {
      const doResolve = (value) => {
        if (this.state === 'pending') {
          this.state = 'fulfilled'
          this.value = value

          while (this.successQueue.length) {
            const callback = this.successQueue.shift()

            callback && callback(this.value)
          }
        }
      }
      
      setTimeout(doResolve, 0)
    }

    const reject = () => {
      const doReject = (value) => {
        if (this.state === 'pending') {
          this.state = 'rejected'
          this.value = value

          while (this.failureQueue.length) {
            const callback = this.failureQueue.shift()

            callback && callback(this.value)
          }
        }
      }
      
      setTimeout(doReject, 0)
    }

    exec(resolve, reject)
  }

  then(success, failure) {
    return new MyPromise((resolve, reject) => {
      const successFn = (value) => {
        try {
          const result = success(value)

          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }

      const failureFn = (value) => {
        try {
          const result = failure(value)

          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }

      if (this.state === 'pending') {
        this.successQueue.push(successFn)
        this.failureQueue.push(failureFn)
      } else if (this.state === 'fulfilled') {
        success(this.value)
      } else {
        failure(this.value)
      }
    })
  }
}

const pro = new MyPromise((resolve, reject) => {
  setTimeout(resolve, 1000)
  setTimeout(reject, 2000)
})

pro
  .then(() => {
    console.log('2_1')
    const newPro = new MyPromise((resolve, reject) => {
      console.log('2_2')
      setTimeout(reject, 2000)
    })
    console.log('2_3')
    return newPro
  })
  .then(
    () => {
      console.log('2_4')
    },
    () => {
      console.log('2_5')
    }
  )
  
pro
  .then(
    data => {
      console.log('3_1')
      throw new Error()
    },
    data => {
      console.log('3_2')
    }
  )
  .then(
    () => {
      console.log('3_3')
    },
    e => {
      console.log('3_4')
    }
  )