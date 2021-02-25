let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

// 路由

app.get('/cors', (req, res) => {
  var arr = [{name: 'liheng', age: 21}, {name: 'what',age: '99'}];
  res.setHeader('Access-Control-Allow-Origin','http://localhost:open in browser插件端口未知????');
  res.send(arr);
})

app.listen(3000, () => {
  console.log('Server is running......');
})