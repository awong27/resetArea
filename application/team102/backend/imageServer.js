const express = require('express');
const cors = require('cors');

const port = 3010;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser());

app.use(cors);


app.post('api/image/save', (req, res) => {
    console.log('image server called');
    console.log(req);
    res.send('hello')
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
