function quickSort(arr, left, right) {
  left = typeof left === 'number' ? left : 0;
  right = typeof right === 'number' ? right : arr.length - 1;
  
  if (left < right) {
    let position = getPosition(arr, left, right)
    quickSort(arr, left, position - 1)
    quickSort(arr, position + 1, right)
  }
}

function getPosition(arr, left, right) {
  let p = left, index = p + 1;

  // while(left + 1 < right) {
  //   if (arr[p] > arr[left]) {
  //     swap(arr, index, left)
  //     index ++;
  //   }

  //   left++;
  // }
  for (let i = index; i <= right; i ++) {
    if (arr[p] > arr[i]) {
      swap(arr, i, index)
      index ++;
    }
  }

  swap(arr, p, index - 1)

  return index - 1
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


function quickSort(arr, left, right) {
  var len = arr.length,
      partitionIndex,
      left = typeof left != 'number' ? 0 : left,
      right = typeof right != 'number' ? len - 1 : right;

  if (left < right) {
      partitionIndex = partition(arr, left, right);
      quickSort(arr, left, partitionIndex-1);
      quickSort(arr, partitionIndex+1, right);
  }
  return arr;
}

function partition(arr, left ,right) {     // 分区操作
  var pivot = left,                      // 设定基准值（pivot）
      index = pivot + 1;
  for (var i = index; i <= right; i++) {
      if (arr[i] < arr[pivot]) {
          swap(arr, i, index);
          index++;
      }       
  }
  swap(arr, pivot, index - 1);
  return index-1;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}