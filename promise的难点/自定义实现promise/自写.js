(function (global) {
  const PENDING = 'pending';
  const RESOLVED = 'resolved';
  const REJECTED = 'rejected';
  //  Heng构造函数
  function Heng(executor) {
    const that = this

    that.data = undefined;
    that.status = PENDING;
    that.callback = [];

    function resolve(value) {      
      if (that.status != PENDING) {
        return
      }         //resolve函数的实现
        that.status = RESOLVED;
        that.data = value
        if (that.callback.length > 0) {
          setTimeout(() => {
            that.callback.forEach((value, index) => {
              value.onResolved(that.data)
            })
          })
        }
    }
    function reject(value) {  
      if (that.status != PENDING) {
        return
      }              //resolve函数的实现
      if (that.status == PENDING) {
        that.status = REJECTED;
        that.data = value;
        if (that.callback.length > 0) {
          setTimeout(() => {                 //通过定时器模拟异步
            that.callback.forEach((value) => {
              value.onRejected(value)
            })
          })
        }
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }


  Heng.prototype.then = function (onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : () => onResolved;
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => { throw err };

    const that = this
    return new Heng((resolve, reject) => {
      // 封装返回的promise结果处理函数
      function deal(callback) {
        try {
          var result = callback(that.data);
          if (result instanceof Heng) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }

      }

      if (that.status === RESOLVED) {
        setTimeout(() => {
          deal(onResolved)
        })
      } else if (that.status = REJECTED) {
        setTimeout(() => {
          deal(onRejected)
        })
      } else {
        that.callback.push({
          onResolved() {
            deal(onResolved)
          },
          onRejected() {
            deal(onRejected)
          }
        });
      }
    })
  }

  Heng.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }
  Heng.resolve = function (value) {
    return new Heng((resolve, reject) => {
      if (value instanceof Heng) {
        value.then(resolve, reject)
      } else {
        resolve(value);
      }
    })

  }
  Heng.reject = function (value) {
    return new Heng((resolve, reject) => {
      reject(value);
    })
  }
  Heng.all = function (promises) {
    let count = 0;
    let promises_data = [];
    return Heng((resolve, reject) => {
      promises.forEach((value, index) => {
        value.then((data) => {
          count++;
          promises_data[index] = data;
          if (count === promises.length) {
            resolve(promises_data)
          }
        }, (data) => {
          reject(data)
        })
      });
    })

  }
  Heng.race = function (promises) {
    return new Heng((resolve, reject) => {
      promises.forEach((value) => {
        value.then(resolve, reject)
      })
    })
  }
  Heng.resolveDelay = function (value, time) {
    return new Heng((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Heng) {
          value.then(resolve, reject)
        } else {
          resolve(value);
        }
      }, time)
    })
  }
  Heng.rejectDelay = function (value, time) {
    return new Heng((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Heng) {
          value.then(resolve, reject)
        } else {
          resolve(value);
        }
      }, time)
    })
  }
  global.Heng = Heng;
}(global))



let a = new Heng((resolve, reject) => {
  // resolve(1)
  console.log(this.status);
  setTimeout(() => {
  reject(2)
  console.log(12332);
  }, 2000);
  // console.log(1323213);
});
a.then(value => {
    console.log('onResolve()1', value);
  }).then(
    value => { console.log('onResolved()2', value) },
    reason => {
      console.log('onRejected2()', reason)   //
      // return 3
      // throw 4
      // return new Promise((resolve, reject) =>resolve(5))
      return new Heng((resolve, reject) => reject(6))
    }
  ).then(
    value => { console.log('onResolved3()', value) },
    reason => {
      console.log('onRejected3()', reason)   ///
      // throw reason
    }
  ).catch(reason => {
    console.log('onRejected4()', reason)       ///
  }).then(
    value => { console.log('onResolved5()', value) },
    reason => {
      console.log('onRejected5()', reason)          ////
    }
  )
  console.log(a);