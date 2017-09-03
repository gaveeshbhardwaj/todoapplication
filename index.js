var express = require('express');
var todoData = require('./seed.js').todoObj;
var statusENUMS = require('./seed.js').statusENUMS;
var app = express();
app.use("/",function (req,res,next) {
    console.log("Connecting to "+req.method+" "+req.url);
    next();
});
app.use("/",express.static(__dirname+"/public"));

app.get("/api/todos/",function (req,res) {
    res.json(todoData);
});
app.get("/api/todos/active",function (req,res) {
    var x=[];
    todoData.forEach(function(a){
        if(a.status==statusENUMS.ACTIVE){
            x.push(a);
        }
    });
    res.json(x);
});
app.get("/api/todos/complete",function (req,res) {
    var x=[];
    todoData.forEach(function(a){
        if(a.status==statusENUMS.COMPLETED){
            x.push(a);
        }
    });
    res.json(x);
});
app.get("/api/todos/delete",function (req,res) {
    var x=[];
    todoData.forEach(function(a){
        if(a.status==statusENUMS.DELETED){
            x.push(a);
        }
    });
    res.json(x);
});
app.delete("/api/todos/:id",function (req,res) {
    var id = req.params.id;
    var obj = todoData[id];

    if(!obj){
        res.status(400).json({error:"Does not Exist!!"});
    }
    else {
        obj.status = statusENUMS.DELETED;
        res.send(todoData);
    }
});

var bodyparser = require("body-parser");
app.use("/",bodyparser.urlencoded({encoded:false}));
app.post("/api/todos",function (req,res) {

    var title = req.body.title;
    if(!title || title =="" || title.trim()==""){
        res.status(400).json({error:"Title cant be Blank"});
    }
    else {
        var newToDo = {
            title: title,
            status: statusENUMS.ACTIVE
        }
        todoData.push(newToDo);
        res.send(todoData);
    }
});
app.put("/api/todos/:id",function (req,res) {
    // var title = req.query.title;
    var status = req.body.status;
    var obj = todoData[req.params.id];
    console.log(status);
    console.log(obj);
    if(!obj){
        res.status(400).json({error:"Does not Exist!!"});
    }
    // else if(!title || title == "" || title.trim()==""){
    //     res.status(400).json({error:"Title Cant be Empty!!"});
    // }
    else if(status !=statusENUMS.ACTIVE && status !=statusENUMS.DELETED && status !=statusENUMS.COMPLETED){
        res.status(400).json({error:"Invalid Status!!"});
    }
    else {
        // obj.title = title;
        obj.status = status;
        res.send(todoData);
    }
});

app.put("/api/todos/complete/:id",function (req,res) {
    var status = statusENUMS.COMPLETED;
    var obj = todoData[req.params.id];

    if(!obj){
        res.status(400).json({error:"Does not Exist!!"});
    }
    else {
        obj.status = status;
        res.send(todoData);
    }
});
app.put("/api/todos/active/:id",function (req,res) {
    // var title = req.query.title;
    var status = statusENUMS.ACTIVE;
    var obj = todoData[req.params.id];

    if(!obj){
        res.status(400).json({error:"Does not Exist!!"});
    }

    else {
        obj.status = status;
        res.send(todoData);
    }
});


app.listen(3000);