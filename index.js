// Required Node modules
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const request = require('then-request');
const app = express();

// Using environment variables
dotenv.config({
    path: __dirname + '/config/config.env'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static html page for recaptcha
app.get('/verify', (_, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route function / Controller
const handleSend = async (req,res) => {
    
}

// Verifying captcha through google service
app.post('/send', (req,res)=> {
    async function main() {
        const token = req.body.token;
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${token}`;
        // Making request using then-request
        let response = await request('POST',url);
        response = JSON.parse(response.body)
        console.log(response);
        res.send(response);
    }
    main();
    
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`${process.env.SERVER_NAME} is listening on port ${process.env.PORT || 3000}`.bgWhite.black);
});