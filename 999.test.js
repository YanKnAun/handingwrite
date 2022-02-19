// var obj = {
//   value: "vortesnail",
// };

// function fn() {
//   console.log(this.value);
// }

// fn.call(obj);

// 手写call
Function.prototype.myCall = function(ctx, ...args) {
  if (!ctx) {
    ctx = typeof window !== 'undefined' ? window : global
  }

  ctx = Object(ctx);

  const fnName = Symbol('key');

  ctx[fnName] = this;

  const result = ctx[fnName](...args);

  delete fnName;

  return result;
}

// 手写apply
Function.prototype.myApply = function (ctx, args) {
  if (!ctx) {
    ctx = typeof window !== 'undefined' ? window : global;
  }

  ctx = Object(ctx);

  const fnName = Symbol('key');

  ctx[fnName] = this;

  const result = ctx[fnName](...args);

  delete ctx[fnName];

  return result;
}

// 手写bind
Function.prototype.myBind = function (ctx, ...args) {
  if (!ctx) {
    ctx = typeof window !== 'undefined' ? window : global;
  }

  
}