var express=require("express");
var app=express();
const MongoClient=require('mongodb').MongoClient;
const url= "mongodb://localhost:27017/";
const dbname='hosp';
let db
MongoClient.connect(url,(err,client)=>{
    if(err) return console.log(err);
    db=client.db(dbname);
    console.log('connected Database:'+dbname);
    console.log('database :${dbname}');
});