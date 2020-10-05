var http=require("http");
http.createServer(function(req,res){
    res.end("hello world in");
}).listen(8000);
console.log("hello in console");