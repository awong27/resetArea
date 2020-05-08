const express = require('express');
const Vision = require('@google-cloud/vision');
const vision = new Vision.ImageAnnotatorClient({
    keyFilename: './visionAssets/visionKey.json'
});
const axios = require('axios');


const app = express();

const port = process.env.port || 3005;

vision
    .textDetection('./visionAssets/receipts/1.jpg')
    .then(results => {
        const texts = results[0].textAnnotations;
        const itemsIds = [];
        
        console.log('text:');
        texts.forEach(text => {
            let id = Number.parseInt(text.description);
            if (id > 9999 && id < 1000000) {
                itemsIds.push(id);
            }
        });

        axios.post('http://localhost:3006/api/description/get', {
            itemsIds
        });
        
        //console.log(itemsId);
    })
    .catch(err => {
        console.log(err);
    });
    

app.listen(port);