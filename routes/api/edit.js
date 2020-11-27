const express = require('express');
const router = express.Router();
const uniqid = require('uniqid')

const URL = require('../../models/urls');

router.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next();
});

router.post('/', (req, res)=> {
    
    let urlBefore = req.body.shortUrlBefore;
    let listBefore = urlBefore.split('/');
    let lengthBefore = listBefore.length;
    let conditions = {id: listBefore[lengthBefore - 1]};
    console.log("condition:", conditions)
    //branded edit
    if (req.body.shortUrlAfter) {
        let urlAfter = req.body.shortUrlAfter;
        let listAfter = urlAfter.split('/');
        let lengthAfter = listAfter.length;
        let updates = {$set: {id: listAfter[lengthAfter - 1], hash: listAfter[lengthAfter - 1]}};
        //check if the branded already exist
        URL.findOne({id: listAfter[lengthAfter - 1]}, function(err, doc){
            if (doc) {
                res.send({
                    message: 'the branded URL already exist.'
                })
            }else {
                console.log(err)
                URL.updateMany(conditions, updates, function(err) {
                    if (err) {
                        console.error(err);
                    }else {
                        res.send({
                            message: `Your new URL is ${req.body.shortUrlAfter}`,
                            state: 200,
                            stateText: 'OK'
                        })
                        console.log("update successfully.")
                    }
                });
            }
        });

        
        URL.findOne({id: listAfter[lengthAfter - 1]}, function (error, doc) {
            if (error) {
                console.error(error)
            } else {
        
                console.log("after update：", doc)
            }
        });
    }else {
        //non-branded edit
        const uid = uniqid();
        let updates = {$set: {id: uid, hash: uid}};
        URL.updateMany(conditions, updates, function(err) {
            if (err) {
                console.error(err);
            }else {
                res.send({
                    hash: uid,
                    message: `Your new URL is https://react3demo.herokuapp.com/${uid}`,
                    state: 200,
                    stateText: 'OK'
                })
                
            }
        });
    }
})
module.exports = router;