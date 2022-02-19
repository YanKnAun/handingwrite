Function.prototype.myApply = function(ctx, args) {
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