function myFlat(arr, dept = 1) {
  if (dept > 0) {
    return arr.reduce((sum, cur) => {
      return sum.concat(cur instanceof Array ? myFlat(cur, dept - 1) : cur)
    }, [])
  }

  return arr.slice()
}


function flat(arr, depth = 1) {
  if (depth > 0) {
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur);
    }, []);
  }
  return arr.slice();
}
