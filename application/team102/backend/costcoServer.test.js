const test = require('ava');
const axios = require('axios');

test('testing description', async t => {
    const itemsIds = [8773];

    const description = new Promise( (resolve, reject) => {
        axios.post(`http://localhost:3004/api/description/get`, {
            itemsIds
        }).then((res)=>{
            //response.send(res.data);
            resolve(res.data[0]);
        })
        .catch((e) => {
            console.log(e);
        })
    });
    t.is(await description, 'Chicken of the Sea Chunk Light Tuna in Water, 66.5 oz');

});