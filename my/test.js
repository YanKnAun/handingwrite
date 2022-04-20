function myInstanceof(target, origin) {
  if (target === null || typeof target !== 'object') {
    return false
  }

  let proto = target.__proto__

  while(proto) {
    if (proto === origin.prototype) {
      return true
    }

    proto = proto.__proto__
  }

  return false
}

Function.prototype.myCall = function(ctx, ...args) {
  if (!ctx) {
    typeof 'window' !== 'undefined' ?  window : global
  }

  ctx = Object(ctx)

  let fn = Symbol('key')

  ctx[fn] = this

  const result = ctx[fn](...args)

  delete ctx[fn]

  return result
}

Function.prototype.myApply = function(ctx, args) {
  if (!ctx) {
    ctx = typeof window !== 'undefined' ? window : global;
  }

  let fn = Symbol('key')

  ctx = Object(ctx)

  ctx[fn] = this

  let result = ctx[fn](...args)

  delete ctx[fn]

  return result
}

Function.prototype.myBind = function(ctx, ...args) {
  let self = this

  let fn = function() {}

  let fbind = function(...innerArgs) {
    self.apply(ctx, innerArgs.concat(args))
  }

  fn.prototype = this.prototype

  fbind.prototype = new fn()

  return fbind;
}

const showName = function (sex, age) {
  console.log(this, sex, age)
}

const Person = function (name) {
  this.name = name
}

Person.prototype.showName = function (age) {
  console.log(this, this.name, age)
}

const bindPerson = Person.bind(null, 'boy')
const p1 = new bindPerson('前端胖头鱼')

p1.showName(100)


showName.myBind({ name: '前端胖头鱼' }, 'boy')(100)

let obj = {
  'name': 'Yan',
  'age': 17
}

var name = 'yzy';

function fn(params) {
  console.log(this.name);
  console.log(params)
}

fn()
fn.myCall(obj)

function quickSort(arr) {
  quick(arr, 0, arr.length - 1)

  return arr;

  function quick(arr, left, right) {
    if (left < right) {
      const mid = getPosition(arr, left, right)
      quick(arr, left, mid - 1)
      quick(arr, mid + 1, right)
    }
  }

  function getPosition(arr, left, right) {
    let flag = left, index = flag + 1;

    for(let i = index; i <= right; i ++) {
      if (arr[flag] > arr[i]) {
        swap(arr, i, index)
        index ++;
      }
    }

    swap(arr, flag, index - 1);

    return index - 1;
  }

  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp; 
  }
}

function compose(...fn) {
  return fn.reduce((sum, item) => {
    return function (...args) {
      return sum(item(...args))
    }
  })
}

function curry(fn, ...args) {
  var len = fn.length;

  return function(...innerArgs) {
    innerArgs = innerArgs.concat(args)

    if (len > innerArgs.length) {
      return curry(fn, ...innerArgs)
    } else {
      fn.apply(this, innerArgs)
    }
  }
}

const add = curry((num1, num2, num3) => {
  console.log(num1, num2, num3, num1 + num2 + num3)
})

add(1)(2)(3)
add(1, 2)(3)
add(1, 2, 3)
add(1)(2, 3)

class MyPromise {
  constructor(exec) {
    this.state = 'pending'
    this.value = undefined
    this.successQueue = []
    this.failureQueue = []

    const resolve = () => {
      const doResolve = (value) => {
        if (this.state === 'pending') {
          this.state = 'fulfill'
          this.value = value

          while(this.successQueue.length) {
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
          this.state = 'failure'
          this.value = value

          while(this.failureQueue.length) {
            const callback = this.failureQueue.shift()

            callback && callback(this.value)
          }
        }
      }

      setTimeout(doReject, 0)
    }

    try {
      exec(resolve, reject)
    } catch (err) {
      reject(err)
    }
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
      } else if (this.state === 'success') {
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