const express = require('express');
const router = express.Router();
const path = require('path');
const Category = require(path.join(__dirname, "../model/Category"));
const Product = require(path.join(__dirname,"../model/Product"));
const {ObjectId} = require("mongodb");


router.get('/new', async (req,res)=>{
    await res.render('productForm', {
        title : "Créer un produit",
        categories : await Category.getAll()
    });
});

router.get('/:numCategory', async (req,res)=>{
    let product = await Product.getProductById(req.params.numCategory);
    let category = await Category.getById(product.categoryId);
    res.render('product', {
        title : "Informations du produit : " +product.name,
        product : product,
        category : category
    });
});


router.get('/:numCategory/update', async (req,res)=>{
   await res.render('productFormUpdate', {
        title : "Mise à jour d'un produit",
        categories : await Category.getAll(),
        product : await Product.getProductById(req.params.numCategory)
    });
});

router.get('/:numCategory/delete', async (req, res) => {
    await res.render('productDelete', {
        title: "Supprimer un produit",
        categories: await Category.getAll(),
        product: await Product.getProductById(new ObjectId(req.params.numCategory))
    });
});



module.exports= router;
