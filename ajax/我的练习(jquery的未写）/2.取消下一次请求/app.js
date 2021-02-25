let express = require('express');
let app =express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));

// 路由

app.get('/verify', (req,res) => {
    console.log('有人找我要验证码了');
   setTimeout(() => {
    let num = Math.floor(Math.random() * 8999 + 1000)
    res.send(num.toString())
   }, 2000)
})

app.listen(3000, () => {
    console.log('Server is running......');
})