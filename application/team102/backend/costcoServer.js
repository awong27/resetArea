const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');
const port = process.env.PORT || 3006;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser());

app.post('/api/description/get', (req, res) => {

    const descriptions = [];
    let info;
    const itemsIds = req.body.itemsIds;
    
    let returns = 0;

    const promise1 = new Promise( (resolve, reject) => {

        itemsIds.forEach( (item, index, array) => {
    
            rp(`https://www.costcobusinessdelivery.com/${item}`)
            .then((html) => {
                const $ = cheerio.load(html);
                info = $('.description').text().trim();
                returns += 1;
            })
            .then(()=> {
                if(!info.includes('\t')){
                    descriptions.push(info);
                }
            })
            .catch((e) => {
                returns +=1
            }).then( () => {
                if (returns === array.length) resolve('success');
            });
        });
    });

    promise1.then((value) =>{
        console.log(value);
        console.log(descriptions);
        res.send(descriptions);
    });

});

   
app.listen(port);