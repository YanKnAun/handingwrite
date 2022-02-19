function throttle(func, time, immediate) {
  var timeout;

  return function(...args) {
    var ctx = this;

    if (!timeout) {
      timeout = setTimeout(function() {
        func.apply(ctx, args)
        timeout = null
      }, time)
    }
  }
}

function throttle2(func, time, options) {
  var t = 0;

  return function(...args) {
    var ctx = this;
    var now = new Date().getTime()

    if (now - t > time) {
      func.apply(ctx, args)
      t = now
    }
  }
}

var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = throttle2(getUserAction, 1000, true);