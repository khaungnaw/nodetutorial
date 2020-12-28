var express = require("express");
const { DBRef } = require("mongojs");
var router = express.Router();

const mongojs = require("mongojs");
const db = mongojs("travel", ["records"]);

const { body, param, validationRresult } = require("express-validator");

router.get("/records", function(req, res){
    const options = req.query;
    //validation
    const sort = options.sort || {};
    const filter = options.filter || {};
    const limit = 10;
    const page = parseInt(options.page) || 1;
    const skip = (page -1 ) * limit;

    for(i in sort){
        sort[i] = parseInt(sort[i]);
    }

    db.records.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit, function(err, data){
        if(err){
            return res.sendStatus(500);
        } else{
            return res.status(200).json({
                meta: { skip, limit, sort, filter, page , total: data.length},
                data,
                links: {
                    self : req.originalUrl,
                }
            });
        }
    });
});

router.get("/test", function(req, res){
    return res.json(req.query);
});
module.exports = router;
