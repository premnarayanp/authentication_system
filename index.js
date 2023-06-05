require('dotenv').config()
const port = process.env.PORT || 8394;
const express = require('express');
const app = express();

// use post request  url
app.use(express.urlencoded());



//for json req/res
app.use(express.json());

app.listen(port, function(error) {

    if (error) {
        console.log(`Error in running the server:${error}`);
    }
    console.log(`Server is running on port: ${port}`);
});