const fs = require('fs');
const path = './new/';
fs.readdir(path, (err, data) => {
    // console.log(data);
    for(var i = 0; i < data.length;i++){
        // console.log(value);
        const reg = /\d{1,3}\.(\d{2}.*)/
        // console.log(reg.exec(value)[1]);
        const new_name = reg.exec(data[i])[1];
        console.log(new_name);
        const new_path = `./new/${new_name}`
        // console.log(path + data[i]);
        // console.log(new_path);
        // fs.renameSync(path, new_path);
        fs.rename(path + data[i], new_path, (err) => {
           if(err) {throw err }
        })
    }
})