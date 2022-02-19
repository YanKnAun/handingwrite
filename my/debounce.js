function debounce (func, time, immediate) {
  var timeout;

  return function(...args) {
    var ctx = this;

    if (timeout) {
      clearTimeout(timeout)
    }

    if (immediate) {
      let callNow = !timeout;

      timeout = setTimeout(function() {
        timeout = null
      }, time)

      if (callNow) {
        func.apply(ctx, args)
      }
    } else {
      timeout = setTimeout(function() {
        func.apply(ctx, args)
      }, time)
    }
  }
}

var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = debounce(getUserAction, 1000, true);