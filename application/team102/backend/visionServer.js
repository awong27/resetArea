const express = require('express');
const Vision = require('@google-cloud/vision');
const vision = new Vision.ImageAnnotatorClient({
    keyFilename: './visionAssets/visionKey.json'
});
const axios = require('axios');

const app = express();

app.use(express.json());


const port = process.env.port || 3005;
const gatewayUrl = process.env.gatewayUrl || 'http://localhost:3004';

app.get('/api/scan', (req, response) => {

    const fileName = req.query.name;
    vision
    .textDetection(`./visionAssets/receipts/${fileName}`)
    .then(results => {
        const texts = results[0].textAnnotations;
        const itemsIds = [];
        
        //console.log('text:');
        texts.forEach(text => {
            let id = Number.parseInt(text.description);
            if (id > 9999 && id < 10000000) {
                itemsIds.push(id);
            }
        });

        axios.post(`${gatewayUrl}/api/description/get`, {
            itemsIds
        }).then((res)=>{
            console.log(res.data);
            response.send(res.data);
        }).catch((e) => {
            console.log(e);
        });

    })
    .catch(err => {
        console.log(err);
    });

});


app.listen(port);