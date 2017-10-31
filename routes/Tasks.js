var express = require('express');
var router = express.Router();
var webApi = require('../models/Task');

router.get('/getAllUser', function (req, res, next) {
    webApi.getAllUser(function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});


router.post('/addUser', function (req, res, next) {
    webApi.addUser(req.body, function (err, count) {
        if (err) {
            var message = Error(err).message;
            console.log("message="+message)
            var code = 500;
            var errorObj = {
                "message": "Server error found."
            }
            var temp=new String("Error: username not available")
            console.log("temp="+temp)
            if (message.valueOf() == temp.valueOf()) {
                errorObj["message"] = "Username not available.";
                code = 400;
            }

            res.statusCode = code;
            res.json(errorObj);

        } else {
            var json = {
                "message": "Record inserted successfully"
            }

            res.json(json);
        }
    });
});

/*
router.get('/:id?',function(req,res,next){

if(req.params.id){

    Task.getTaskById(req.params.id,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
}
else{

 Task.getAllTasks(function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
 
    });
}
});
router.post('/',function(req,res,next){

        Task.addTask(req.body,function(err,count){

            //console.log(req.body);
            if(err)
            {
                res.json(err);
            }
            else{
                    res.json(req.body);//or return count for 1 & 0
            }
        });
});
 router.post('/:id',function(req,res,next){
  Task.deleteAll(req.body,function(err,count){
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(count);
    }
  });
});
router.delete('/:id',function(req,res,next){

        Task.deleteTask(req.params.id,function(err,count){

            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(count);
            }

        });
});
router.put('/:id',function(req,res,next){

    Task.updateTask(req.params.id,req.body,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});*/
module.exports = router;