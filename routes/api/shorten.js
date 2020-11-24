const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');


const URL = require('../../models/urls')

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

router.get('/test', (req,res) => res.json({msg:'API is working.'}));

router.post('/', (req, res) => {
    
    if (req.body.url) {
        urlData = req.body.url;
    }
    console.log('URL is', urlData);
    URL.findOne({url: urlData}, (err, doc) =>{
        if (doc) {
            console.log(`This url has been found in the history record. Enter a new one for shorten or check out http://wenqi/${urlData}/edit for edit/delete`);
            console.log('Entry found in db.')
            res.send({
                message: `This url has been found in the history record. Enter a new one for shorten or check out http://wenqi/${urlData}/edit for edit/delete`
            })
        }else {
            console.log("line 27: ",req.body.link);
            const list = req.body.link.split('/');
            const length = list.length;
            console.log("real hash: ", list[length-1])
            URL.findOne({id:list[length-1]}, (err, doc) => {
                if (doc) {
                    console.log('Please type another branded URL, this one has been taken.')
                    res.send({
                        message: 'Please type another branded URL, this one has been taken.'
                    });
                }else {
                    //if we don't have branded link
                    if(!req.body.link) {
                        console.log("New url.");
                        const webAddress = new URL({
                            id : uniqid(),
                            url: urlData,
                        })
                        webAddress.save((err) => {
                            if (err) {
                                return console.error(err);
                            }
                            res.send({
                                url: urlData,
                                hash: webAddress.id,
                                status: 200,
                                statusText: 'OK'
                            })
                        })
                    }else{
                        console.log("use branded url");
                        const arr = req.body.link.split('/');
                        console.log(arr);
                        let branedPart = '';
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i] != null && arr[i].length !== 0){
                                branedPart = arr[i];
                            }
                        }
                        const brandedAddress = new URL({
                            id : branedPart,
                            url: urlData,
                        })
                        brandedAddress.save((err) => {
                            if (err) {
                                return console.error(err);
                            }
                            
                            res.send({
                                url: urlData,
                                hash: branedPart,
                            })
                        })
                    }
                }
            })
            
        }
    })
})


module.exports = router;