####outputPath：相对于output配置属性中的path属性
####publicPath：相对首页HTML文件（既index.html文件等）

url-loader中的limit参数限制会转成base64编码的图片，
而为转为base64编码的图片会经过outputPath和publicPath参数生成到指定位置。



![avatar](/src/images/IMG_0559(20200820-000802).PNG)