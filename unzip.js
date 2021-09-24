const fs = require('fs/promises');
const { resolve, extname, dirname, basename } = require("path");

// NOTE:需要安装
const adm_zip = require('adm-zip');

const removeArr = ['本套课程来自vipc6.com.jpg', '更多课程：VIPC6.COM.url', '课程说明与解压密码.txt']

async function recurUnzip(path) {
  try {
    const filenames = await fs.readdir(path)

    for (let i = 0; i < filenames.length; i++) {
      let pathname = resolve(path, filenames[i]);
      const stats = await fs.stat(pathname);

      if (stats.isDirectory()) {
        recurUnzip(pathname);
      } else if (extname(pathname) === ".zip") {
        var unzip = new adm_zip(pathname);
        unzip.extractAllTo(dirname(pathname), true);
        //  解压后删除压缩文件
        fs.unlink(pathname)
      }

      //  删除多余文件
      if (removeArr.includes(basename(pathname))) {
        fs.unlink(pathname);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

recurUnzip("../zuoshen-algorithm");
