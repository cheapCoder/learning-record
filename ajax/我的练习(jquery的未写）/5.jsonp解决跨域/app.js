let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

// 路由

app.get('/jsonp', (req, res) => {
  var arr = [{name: 'liheng', age: 21}, {name: 'what',age: '99'}];
  var { callback } = req.query;
  console.log(callback);
  res.send(`${callback}(${JSON.stringify(arr)})`);
})

app.listen(3000, () => {
  console.log('Server is running......');
})