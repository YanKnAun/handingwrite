class EventEmitter {
  constructor () {
    this.events = {}
  }
  // 事件监听
  on (evt, callback, ctx) {
    if (!this.events[ evt ]) {
      this.events[ evt ] = []
    }
    
    this.events[ evt ].push(callback)

    return this
  }
  // 发布事件
  emit (evt, ...payload) {
    const callbacks = this.events[ evt ]

    if (callbacks) {
      callbacks.forEach((cb) => cb.apply(this, payload))
    }

    return this
  } 
  // 删除订阅
  off (evt, callback) {

    // 啥都没传，所有的事件都取消
    if (typeof evt === 'undefined') {
      delete this.events
    } else if (typeof evt === 'string') {
      // 删除指定事件的回调 
      if (typeof callback === 'function') {
        this.events[ evt ] = this.events[ evt ].filter((cb) => cb !== callback)
      } else {
        // 删除整个事件
        delete this.events[ evt ]
      }
    }

    return this
  }
  // 只进行一次的事件订阅
  once (evt, callback, ctx) {
    const proxyCallback = (...payload) => {
      callback.apply(ctx, payload)
      // 回调函数执行完成之后就删除事件订阅
      this.off(evt, proxyCallback)
    }

    this.on(evt, proxyCallback, ctx)
  }
}

// 测试

const e1 = new EventEmitter()

const e1Callback1 = (name, sex) => {
  console.log(name, sex, 'evt1---callback1')
}
const e1Callback2 = (name, sex) => {
  console.log(name, sex, 'evt1---callback2')
}
const e1Callback3 = (name, sex) => {
  console.log(name, sex, 'evt1---callback3')
}

e1.on('evt1', e1Callback1)
e1.on('evt1', e1Callback2)
e1.once('evt1', e1Callback3)
e1.emit('evt1', '前端胖头鱼', 'boy')
console.log('------尝试删除e1Callback1------')
e1.off('evt1', e1Callback1)
e1.emit('evt1', '前端胖头鱼', 'boy')



//subscribe.js
class Subscribe {
  constructor() {
      //创建容器
      this.pond = [];
  }
  //向容器中增加方法，注意去重
  add(fn) {
      let pond = this.pond,
          isExist = false;
      //去重环节
      pond.forEach(item => item === fn ? isExist = true : null);
      !isExist ? pond.push(fn) : null;
  }
  remove(fn) {
      let pond = this.pond;
      pond.forEach((item, index) => {
          if(item === fn) {
              //提一下我在这里遇到的坑，这里如果写item=null是无效的
              //例子：let a = {name: funtion(){}};
              //let b = a.name;
              //这个时候操作b的值对于a的name属性是没有影响的
              pond[index] = null;
          }
      })
  }
  fire(...arg) {
      let pond = this.pond;
      for(let i = 0; i < pond.length; i++) {
          let item = pond[i];
          //如果itme为空了,最好把它删除掉
          if (item === null) {
              pond.splice(i, 1);
              //如果用了splice要防止数组塌陷问题，即删除了一个元素后，后面所有元素的索引默认都会减1
              i--;
              continue;
          }
          item(...arg);
      }
  }
}
window.Subscribe = Subscribe;

