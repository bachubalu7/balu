
var express= require('express');
var app=express();
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017';
const databasename='hosp';
const ventname ="ventilator";
const hospitalsc='hospital';
let db
MongoClient.connect(url, (err,client)=>{
    if(err) return console.log(err);
    db=client.db(databasename);
//retrieving data from ventilator collection through hospital name.
app.get('/hospitalname1', (req, res) => {

    db.collection(ventname, function (err, collection) {
        if(err) return console.log(err);
       collection.find({"name":req.query.hon}).toArray(function(err, items) {
        if(err) throw err;    
        res.send(items);            
    });
        });
    });
    //retrieving data from hospital collection through hospital name.

    app.get('/hospitalname2', (req, res) => {

        db.collection(hospitalsc, function (err, collection) {
            if(err) return console.log(err);
           collection.find({"name":req.query.hon}).toArray(function(err, items) {
            if(err) throw err;    
            res.send(items);            
        });
            });
        }); 
        //retrieving ventilator details through status of ventilator 
app.get('/status', (req, res) => {

    db.collection(ventname, function (err, collection) {
        if(err) return console.log(err);
       collection.find({"status":req.query.vs}).toArray(function(err, items) {
        if(err) throw err;    
        res.send(items);            
    });
    
        });
    });


       app.put('/update',(req,res)=>{
        db.collection(ventname, function (err, collection) {
        
            collection.update({"ventid":req.query.ventid}, { $set: {"status" : req.query.vs} },
                                                         function(err, result){
                                                                    if(err) throw err;    
                                                                    console.log('Document Updated Successfully');
                                                            });
            });
        });
        app.post('/add',(req,res)=>
        {
            db.collection(ventname,function(err,collection)
            {
                collection.insert({ "hid" :req.query.nid,
                "ventid" : req.query.nvid,
                "status" : req.query.ns,
                "name" : req.query.nn})
            });
        });
        app.delete('/remove',(req,res)=>
        {
            db.collection(ventname,function(err,collection)
            {
                collection.remove({"ventilatorId":req.query.ventid});
            });
        });

    app.listen(3006);
    


});