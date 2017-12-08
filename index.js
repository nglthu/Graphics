//var THREE=require('three');
var http = require('http');
http.createServer(onRequest).listen(8000);

function onRequest(req,res){

    res.writeHead(200,{'content-type':'text/plain'});
    res.write("Hello");
    res.end();
}
