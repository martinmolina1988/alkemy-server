const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require('dotenv')
const cors = require('cors');


const app = express();
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
            
}
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions))


app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Set the environment variables
dotenv.config();



// call the router
app.use('/',require('./routes/router'))


app.listen(4000, ()=>{
    console.log("SERVER UP running in http://localhost:4000");
});