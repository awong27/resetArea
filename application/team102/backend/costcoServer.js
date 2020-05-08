const express = require('express');
const rp = require('request-promise');
const cheerio = require('cheerio');
const port = 3006;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser());

app.post('/api/description/get', (req, res) => {

    const descriptions = [];
    let info;
    const itemsIds = req.body.itemsIds;
    
    let successes = 0;
    let failures = 0;
    let returns = 0;

    const promise1 = new Promise( (resolve, reject) => {

        itemsIds.forEach( (item, index, array) => {
    
            rp(`https://www.costcobusinessdelivery.com/${item}`)
            .then((html) => {
                const $ = cheerio.load(html);
                info = $('.description').text().trim();
                //console.log(info);
                returns += 1;
                //console.log(`returns ${returns}`);
            })
            .then(()=> {
                descriptions.push(info);
            })
            .catch((e) => {
                //console.log(e);
                //add to array item not found.
                returns +=1
                //console.log(`returns ${returns}`);
            }).then( () => {
                //console.log(`length of original array ${array.length} returns ${returns}`);
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