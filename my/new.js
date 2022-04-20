function myNew(ctx, ...args) {
  const obj = new Object();

  obj.__proto__ = ctx.prototype;

  const res = ctx.apply(obj, args);

  return typeof res === "object" ? res : obj;
}