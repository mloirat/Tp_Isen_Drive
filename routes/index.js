// TODO compléter
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('index', {title: "Bienvenue à ISEN Drive"});
});

module.exports= router;
