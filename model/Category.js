const Product = require("./Product.js")

const { MongoClient, ObjectId, ServerApiVersion} = require('mongodb');

/* Init en dur
const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "isen_drive";
const client = new MongoClient(url);
*/

const uri = process.env.MONGODB_URI;
const dbName =  process.env.BDD_NAME;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1});

const Category = {

    getById : async function (categoryId) {
        let categories = await this.getAll();
        for(let k =0; k<categories.length; k++){
            let idCategory = categories[k]._id;
            let myObjectId = new ObjectId(categoryId);
            if(myObjectId.equals(idCategory)){
                return categories[k];
            }
        }
    },

    /*** getAll version en dur***/
    /*
    getAll : function(){
        const categories = [
            {_id: "1", name: "Boucherie"},
            {_id: "2", name: "Boulangerie"},
            {_id: "3", name: "Produits laitiers"},
            {_id: "4", name: "Fruits & Légumes"},
            {_id: "5", name: "Bébé"},
            {_id: "6", name: "Entretien"},
        ];

        // computes category size
        for(let category of categories){
            category.size = Product.getByCategory(category._id).length;
        }

        return categories;
    }
     */

    getAll : async function(){
        return this.getCategories()
    },

    getCategories: async function() {
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
    },

    insert : function(categoryName){
        const db = client.db(dbName);
        const categoriesCollection = db.collection('categories');
        return categoriesCollection.insertOne({ name : categoryName})
    }
}

module.exports = Category;
