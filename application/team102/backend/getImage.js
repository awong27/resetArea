const express = require('express');
const cors = require('cors');

const port = 5555;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('fuck this shit');
    console.log('peu peu');
});

app.listen(port);