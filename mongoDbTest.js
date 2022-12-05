const { MongoClient } = require('mongodb');
//const Product = require("./model/Product");

const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "isen_drive";
const client = new MongoClient(url);

/*** 1ère version fonctionnelle  : Récupération des rayons
async function getCategories() {
    //1 - Connexion à la BDD
    await client.connect();
    //2 - Selection de la BDD
    const database = client.db(dbName);
    //3 - Selection de la bonne collection
    const categoriesCollection = database.collection('categories');
    //4 - Recuperation des documents
    return categoriesCollection.find().toArray();
}***/

/*** 2ème version : Nombre de Produits***/
async function getCategories() {
    //1 - Connexion à la BDD
    await client.connect();
    //2 - Selection de la BDD
    const database = client.db(dbName);
    //3 - Selection des collections
    const categoriesCollection = database.collection('categories');
    const productsCollection = database.collection('products');
    //4 - Recuperation des documents
    const categories = await categoriesCollection.find().toArray();
    for(const category of categories){
        category.size =  await productsCollection.countDocuments({categoryId : category._id})
    }
    return categories;
}

/*
getCategories()
    .then(console.log)
    .catch(console.error)
    //5 - Femerture de la connexion
    .finally(() => client.close());
*/
async function getProducts() {
    //1 - Connexion à la BDD
    await client.connect();
    //2 - Selection de la BDD
    const database = client.db(dbName);
    //3 - Selection des collections
    const productsCollection = database.collection('products');
    //4 - Recuperation des documents
    return  products = await productsCollection.find().toArray();
}

getProducts()
    .then(console.log)
    .catch(console.error)
    //5 - Femerture de la connexion
    .finally(() => client.close());