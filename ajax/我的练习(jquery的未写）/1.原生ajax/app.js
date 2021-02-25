let express = require('express');
let app =express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));

// 路由
app.get('/get_ajax.html', (req,res) => {
    // console.log(1);
    res.sendFile( '/get_ajax.html')
})
app.get('/get', (req,res) => {
    res.send('receive the request by get');
})

app.post('/post_ajax.html', (req,res) => {
    res.sendFile( '/post_ajax.html')
})
app.post('/post', (req,res) => {
    console.log(req.body);
    res.send('receive the request by post');
})

app.listen(3000, () => {
    console.log('Server is running......');
})