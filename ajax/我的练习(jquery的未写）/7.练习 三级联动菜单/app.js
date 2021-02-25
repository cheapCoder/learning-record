const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { log } = require('console');
let app = express();
mongoose.connect('mongodb://localhost:27017/heng', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('数据库连接成功......');
    }
});
const mesSchema = new mongoose.Schema();
const mesModel = mongoose.model('cities', mesSchema);

app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/favicon.ico');
})

app.get('/get_all_province', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    mesModel.find({ level: 1 }, { name: 1, province: 1, _id: 0 }).exec((err, data) => {
        if (!err && data) {
            res.send({ status: 1, data });
        } else {
            res.send({ status: 0, err });
        }
    })
});
app.get('/get_all_cities', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let { province } = req.query;
    mesModel.find({ level: 2, province: province }, { name: 1, city: 1, _id: 0 }).exec((err, data) => {
        if (!err && data) {
            res.send({ status: 1, data });
        } else {
            res.send({ status: 0, err });
        }
    })
});
app.get('/get_all_counties', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let {city,province} = req.query;
    mesModel.find({ level: 3, city: city, province: province }, { name: 1, county: 1, _id: 0 }).exec((err, data) => {
        if (!err && data) {
            res.send({ status: 1, data });
        } else {
            res.send({ status: 0, err });
        }
    })
});

app.listen(3000, () => {
    console.log('server is running......');
})