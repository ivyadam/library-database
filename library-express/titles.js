module.exports = function(){
    var express = require('express');
    var router = express.Router();
    /*Get title data from database*/
    function getTitles(res, mysql, context, complete){
        mysql.pool.query("SELECT ISBN, bookTitle, author, publisher, datePublished FROM Titles", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.titles = results;
            complete();
        });
    }

    /*Display all titles.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getTitles(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('titles', context);
            }
        }
    });



    return router;
}();