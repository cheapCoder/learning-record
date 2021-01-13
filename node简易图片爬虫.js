const axios = require('axios');
const fs = require('fs')
const request = require('request');

// 判断是否有pachong文件夹
fs.stat('./pachong', (err, res) => {
  if (err) {
    console.log(err);
    fs.mkdir('./pachong', (err) => {
      err && console.log(err.message);
      err || console.log('无pachong文件夹，已经自动创建...');


      
    })
  }
})

// 请求图片地址
axios.get('https://www.grandhonor.net/index.php?c=content&a=list&catid=12').then(({ data }) => {
  console.log(typeof data);
  let urlArr = data.match(/\<img src=\"(\/uploadfiles\/.*)/g)
  // console.log(urlArr.length);
  urlArr = urlArr.map(url => {
    return "https://www.grandhonor.net/" + url.match(/\/uploadfile.*[jpg|png]/g)[0]
  })
  console.log(urlArr);

  urlArr.forEach(url => {
    let filename = url.split('/').pop()
    request(url).pipe(
      fs.createWriteStream(`./pachong/${filename}`).on('error', err => {
        console.log('写入失败', err)
      })
    )
  });
})
