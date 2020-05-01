const express = require('express');
const Vision = require('@google-cloud/vision');
const vision = new Vision.ImageAnnotatorClient({
    keyFilename: './visionAssets/visionKey.json'
});

const app = express();

const port = process.env.port || 3005;

vision
    .textDetection('./visionAssets/receipts/1.jpg')
    .then(results => {
        const texts = results[0].textAnnotations;
        
        console.log('text:');
        texts.forEach(text => console.log(text.description));
    })
    .catch(err => {
        console.log(err);
    });
    

app.listen(port);