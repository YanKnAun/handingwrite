class EventEmitter {
  constructor() {
    this.eventEmitter = {}
  }

  on (evt, cb) {
    if (this.eventEmitter[evt]) {
      this.eventEmitter[evt].push(cb);
    } else {
      this.eventEmitter[evt] = [cb];
    }
  }

  emit(evt, ...args) {
    if (this.eventEmitter[evt]) {
      this.eventEmitter[evt].forEach((item) => {
        item.apply(this, args);
      })
    }
  }

  off (evt, cb) {
    if (this.eventEmitter[evt]) {
      for(let i = 0; i < this.eventEmitter[evt].length; i ++) {
        if (this.eventEmitter[evt][i] === cb) {
          this.eventEmitter[evt].splice(i, 1);
          i --;
        }
      }
    }
  }

  once (evt, cb) {
    const _this = this
    const fn = function(...args) {
      cb.apply(_this, args)
      _this.off(evt, fn)
    }

    this.on(evt, fn)
  }
}

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