var express = require('express');
var path = require('path');
var app = express();

app.set('__build',path.join(__dirname + '/../release'));

app.use("/images", express.static(app.get('__build') + "/images"));
app.use("/css", express.static(app.get('__build') + "/css"));
app.use("/js", express.static(app.get('__build') + "/js"));
app.use("/vendor", express.static(app.get('__build') + "/vendor"));


app.all('/*', function(req,res,next){

  	htmlFileReq = req.path;

  res.sendFile(app.get('__build') + req.path);
});

module.exports = app;