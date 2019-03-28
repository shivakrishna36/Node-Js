const express = require('express');
const app = express();
const student = require('D:/Node Training/Node-js-master/03_26/code&Assignment/src/details/studentDetails.js');
const DOB = require('D:/Node Training/Node-js-master/03_26/code&Assignment/src/compute/ageCalculation.js');
const path = require('path');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbo;
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  dbo = db.db("mydb");
  /*var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });*/
 
});

app.get('/',(req,res)=>{
  res.sendFile('details.html',
  {
    root: path.join(__dirname,'./public')  
  });
});

app.post('/details',(req,res)=>{
let a = req.body;
console.log(a);
let obj = student(a);
let dateOfBirth = DOB(obj.DOB);
obj.age = dateOfBirth;
dbo.collection("studentDetails").insertOne(obj,function(err, res) {
  if (err) throw err;
  console.log("1 document inserted");
  
});
});
app.get('/details',(req,res)=>{
  
  dbo.collection("studentDetails").findOne({},function(err, result) {
    if (err) throw err;
        
    console.log(result);
    let dateOfBirth = DOB(result.DOB);
    console.log('DOB',dateOfBirth);
    
    
  });
  });
app.listen(4444);
