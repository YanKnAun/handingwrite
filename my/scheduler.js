class Scheduler {
  constructor() {
    this.waitList = []
    this.runList = []
  }

  add(promiseMaker) {
    if (this.runList.length >= 2) {
      this.waitList.push(promiseMaker)
    } else {
      this.run(promiseMaker)
    }
  }

  run(promiseMaker) {
    this.runList.push(promiseMaker);
    const index = this.runList.length - 1;

    promiseMaker().then(() => {
      this.runList.splice(index, 1)

      if (this.waitList.length) {
        this.run(this.waitList.shift());
      }
    })
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// output：2 3 1 4
// 一开始，1，2两个任务进入队列。
// 500ms 时，2完成，输出2，任务3入队。
// 800ms 时，3完成，输出3，任务4入队。
// 1000ms 时，1完成，输出1。
