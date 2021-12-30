const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;

dotenv.config({path:'./config.env'});
require('./Database/connect');
// const User = require('./model/userSchema');

app.use(cookieParser());
app.use(express.json());
//linking the router files
app.use(require('./routes/router'));

// heroku static client files 

if(process.env.NODE_ENV == 'production'){
    app.use(express.static("expense_manager_client/build"));
    // const path = require('path');
    // app.get('*',(req, res) =>{
    //     res.sendFile(path.resolve(__dirname, 'expense_manager_client','build',))
    // })
}

app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`);
});