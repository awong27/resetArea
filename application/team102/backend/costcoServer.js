const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');
const port = 3006;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser());

app.post('/api/description/get', (req, res) => {

    console.log(req.body);
    const itemsIds = req.body.itemsIds;

    itemsIds.forEach(item => {
    
        rp(`https://www.costcobusinessdelivery.com/${item}`)
        .then((html) => {
            const $ = cheerio.load(html);
            const info = $('.description').text();
            console.log(info);
        })
        .catch((e) => {
            //console.log(e);
            //add to array item not found.
        });
        
    });

});

   
app.listen(port);