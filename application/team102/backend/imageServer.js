const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const port = 3010;
const axios = require('axios');

const app = express();

app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser());
app.use(fileUpload());


app.post('/api/image/save', (req, response) => {
    
    let file = req.body.file.split(';base64,').pop();
    fs.writeFile('./visionAssets/receipts/image.jpeg', file, {encoding: 'base64'}, function(err) {
        if(err) {
            console.log(err);
        } else {
            axios.get('http://localhost:3004/api/scan?name=image.jpeg')
            .then((res) => {
                console.log(res.data);
                response.send(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
        }
    });

});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
