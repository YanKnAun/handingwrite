function myDeepclone(target) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};

    for(const i in target) {
      cloneTarget[i] = myDeepclone(target[i])
    }

    return cloneTarget;
  } else {
    return target
  }
}