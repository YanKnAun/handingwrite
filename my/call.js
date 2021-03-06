Function.prototype.myCall = function(ctx, ...args) {
  if (!ctx) {
    ctx = typeof window !== 'undefined' ? window : global;
  }

  ctx = Object(ctx);

  let fnName = Symbol('key');

  ctx[fnName] = this;

  let result = ctx[fnName](...args);

  delete ctx[fnName];

  return result;
}

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