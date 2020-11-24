const express = require('express');
const router = express.Router();

router.get('/test', (req,res) => res.json({msg:'API is working.'}));


router.get('/', (req,res) => {
    const hash = req.headers.hash;
    console.log(hash)

    URL.findOne({id: hash})
        .then((doc) => {
            return res.json({url: doc.url})
        })
        .catch((err) => {
            return res.status(400).json({error: 'this link is not working'})
        })
})

module.exports = router;