const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');
const port = 3005;

const app = express();

rp('https://www.costcobusinessdelivery.com/1312297')
    .then((html) => {
        const $ = cheerio.load(html);
        const info = $('.description').text();
        console.log(info);
    })
    .catch((e) => {
        console.log(e);
    });

   
app.listen(port);