const express = require('express');
const router = express.Router();
const path = require('path');
const Category = require(path.join(__dirname, "../model/Category"));
const Product = require(path.join(__dirname,"../model/Product"));

const { MongoClient, ObjectId } = require('mongodb');


router.get('/new',  (req,res)=>{
    res.render('categoryForm', {title : "Créer un rayon"});
});

router.post('/new',  (req,res)=>{
    let result = Category.insert(req.params);
    if(result.acknowledged === true){
        res.render('categoryForm', {title : result.insertId.toString()});
    }else{
        res.render('categoryForm', {title : "ERROR"});
    }
});

router.get('/', async (req,res)=>{
    res.render('categories', {
        title : "Rayons",
        categories : await Category.getAll()
    });
});

router.get('/:numCategory', async (req,res)=>{
    let category = await Category.getById(req.params.numCategory);
    res.render('category', {
        title : "Produits du rayon "+ category.name,
        products : await Product.getByCategory(req.params.numCategory),
        id : category._id
    });
});

router.get('/:numCategory/update', async (req,res)=>{
    res.render('categoryFormUpdate', {
        title : "Mise à jour d'un rayon",
        categories : await Category.getAll(),
        category : await Category.getById(req.params.numCategory)
    });
});

router.get('/:numCategory/delete', async (req,res)=>{
    res.render('categoryDelete', {
        title : "Supprimer un rayon",
        category : await Category.getById(req.params.numCategory)
    });
});


module.exports= router;
