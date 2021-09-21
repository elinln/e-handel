const express = require('express');
const app = express();
const env = require('dotenv');


const config = env.config('.env');

process.env
console.log()


app.get('/', (req, res) => {
    res.status(200).send("helloooo");
})


app.listen(3000, () => {
    console.log("up and running!");
})