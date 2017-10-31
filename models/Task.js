var db = require('../dbconnection'); //reference of dbconnection.js

var Task = {

    getAllUser: function (callback) {
        return db.query("Select username,password from tblusers", callback);
    },

    addUser: function (Task, callback) {

        db.query("select count(*) AS count from tblusers where username=?", [Task.username], function (err, result) {
            if (err) {
                console.log("error come.")
                callback(err, null)
            } else {
                var count = result[0].count;
                if (count == 0) {
                    return db.query("insert into tblusers (username, password) value (?, ?)", [Task.username, Task.password], callback);
                } else {
                    var error = new Error("username not available")
                    callback(error, null)
                }
            }
        });
    },

};

module.exports = Task;
