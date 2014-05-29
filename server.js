var express = require('express');  
var app = express(); 
var publicPath = '.';
app.use(express.static(__dirname + "/" + publicPath)); 
app.listen(process.env.PORT || 8080, process.env.IP, function() {
    console.log("listening on "+process.env.PORT|| 8080);
});
