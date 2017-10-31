var express = require('express');
var router = express.Router();
var webApi=require('../models/Task');

router.get('/getAllUser', function(req, res, next){
    webApi.getAllUser(function(err, rows){
        if(err){
            res.json(err);
        }else{
            res.json(rows);
        }
    });
});


router.post('/addUser', function(req,res,next){
    webApi.addUser(req.body, function(err, count){
        if(err){
            var message=Error(err).message;
            var code=500;
            var myObj = {
                "message": "Server error found."
             }
            if(message.indexOf("ER_DUP_ENTRY") > -1) {
                myObj["message"]="Username not available.";
                code=400;
            }
                          
            res.statusCode=code;
            res.json(myObj);

        }else{
            var json={
                "message":"Record inserted successfully"
            }

            res.json(json);
        }
    });
});