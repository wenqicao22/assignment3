const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());
app.use(express.urlencoded());


const cors = require('cors')

app.use(cors())


mongoose.connect(process.env.MONGODB_URI|| 'mongodb://127.0.0.1/shorten_app', {
    useNewUrlParser: true, useUnifiedTopology: true
  })
        .then(() => console.log('mongoDB connected.'))
        .catch(err => console.log(err));
        // const db = mongoose.connection;
        // db.on('error', console.error.bind(console, 'Error connecting to mongo db'));

const shorten = require('./routes/api/shorten');
app.use('/api/shorten', shorten);

const redirect = require('./routes/api/redirect');
app.use('/api/redirect', redirect);

const edit = require('./routes/api/edit');
app.use('/:hash/edit', edit);

const deletion = require('./routes/api/delete');
app.use('/:hash/delete', deletion);

app.get('/:hash', async (req,res) => {
    const id = req.params.hash;
    console.log(id)
    URL.findOne({id: id}, (err, doc) => {
        if (doc) {
            console.log("doc.url:",doc.url);
            res.redirect(`${doc.url}`);
        }else {
            res.redirect('/');
            console.log("err: ",err);
        }
    })
   
} )


app.get('/', (req, res) => {
    res.send('hello');
});

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
app.listen(port, () => console.log(`Server is on port ${port}`));