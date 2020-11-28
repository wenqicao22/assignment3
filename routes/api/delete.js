const express = require('express');
const router = express.Router();

const URL = require('../../models/urls');
router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next();
});


router.post('/', (req, res) => {
    if (req.body.shortUrlBefore) {
        let urlinfo = req.body.shortUrlBefore;
        let list = urlinfo.split('/');
        let length = list.length;
        URL.deleteMany({id: list[length - 1]}, function(error) {
            if (error) {
                console.error(error);
            }else {
                console.log("deleted.")
            }
        });
        //check if deleted
        URL.findOne({id: list[length - 1]}, function(error,doc) {
            if (error) {
                console.error(error);
            }
            if(doc) {
                console.log(doc)
            }else{
                res.send({
                    message: 'Deleted successfully',
                    status: 200,
                    statusText:'OK'
                })
            }
        });
    }
    
})
module.exports = router;