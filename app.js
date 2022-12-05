// TODO compléter
const express = require('express');
require('dotenv').config();
const debug = require('debug')('http');
/* Config en dur
const app = express();
const port = 3000;
const morgan = require('morgan');
const path = require('path');
*/
const app = express();
const port = process.env.PORT;
const morgan = require('morgan');
const path = require('path');

app.set('view engine', 'pug');
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, "public")));

//Definition des routeurs
const routerIndex= require(path.join(__dirname, "routes/index.js"));
const routerRayon= require(path.join(__dirname, "routes/categories.js"));
const routerProduit= require(path.join(__dirname, "routes/products.js"));

app.use("/", routerIndex);
app.use("/categories", routerRayon);
app.use("/products", routerProduit);


app.listen(port, () => {
        //console.log(`Listening on port ${port}`);
        debug('HTTP sever listening on port ${port})')
    console.log(process.env.DEBUG);
    });