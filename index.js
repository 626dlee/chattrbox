var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
var mime = require('mime');


var handleError = function (err, res) {
    res.writeHead(404);
    fs.readFile('app/error.html', function (err, data) {
        res.end(data);
    });
};



var server = http.createServer(function (req, res) {
    console.log('Responding to a request.');
    // var url = req.url;

    // var fileName = 'index.html';
    // if (url.length > 1) {
    //     fileName = url.substring(1);
    // }
    // console.log(fileName);
    // var filePath = path.resolve(__dirname, 'app', fileName);

    var filePath = extract(req.url);

    fs.readFile(filePath, function (err, data) {
        var mimeType = mime.getType(filePath);
        if (err) {
            handleError(err, res);
            return;
        }
        else {
            res.setHeader('Content-Type', mimeType);
            res.end(data);
        }
    });

    
});



server.listen(3000);