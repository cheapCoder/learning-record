const fs = require('fs');
const path = './new/';

fs.readdir(path, (err, data) => {
    for(var i = 0; i < data.length;i++){
        const reg = /\d{1,3}\.(\d{2}.*)/
        const new_name = reg.exec(data[i])[1];
        const new_path = `./new/${new_name}`
        
        // fs.renameSync(path, new_path);
        fs.rename(path + data[i], new_path, (err) => {
           if(err) {throw err }
        })
    }
})
