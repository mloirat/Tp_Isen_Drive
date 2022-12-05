/*const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "isen_drive";
const client = new MongoClient(url);
*/
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName =  process.env.BDD_NAME;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology:true, serverApi: ServerApiVersion.v1});

const Product = {

    getByCategory : async function(categoryId) {
        let products = await this.getAll();
        let productsOfCategory = [];
        for(let k=0; k<products.length; k++){
            let category = products[k].categoryId;
            let myObjectId = new ObjectId(categoryId);
            if( myObjectId.equals(category)){
                productsOfCategory.push(products[k]);
            }
        }
        return productsOfCategory;
    },

    /***getAll version en dur***/
    /*
    getAll : function() {

        const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.";

        return [

            // Boucherie
            {_id: "1", name: "Poulet blanc", price : 6.4, description : loremIpsum, categoryId: "1"},
            {_id: "2", name: "Steak haché boeuf x 2", price : 5.55, description : loremIpsum, categoryId: "1"},
            {_id: "3", name: "Poitrine porc 600g", price : 5.60, description : loremIpsum, categoryId: "1"},
            {_id: "4", name: "Côte agneau x 3", price : 5.25, description : loremIpsum, categoryId: "1"},

            // Boulangerie
            {_id: "5", name: "Baguette", price : 0.9, description : loremIpsum, categoryId: "2"},
            {_id: "6", name: "Pain multicéréales", price : 1.5, description : loremIpsum, categoryId: "2"},
            {_id: "7", name: "Pain de mie", price : 1.04, description : loremIpsum, categoryId: "2"},

            // produits laitiers
            {_id: "8", name: "Lait x 6", price : 5.15, description : loremIpsum, categoryId: "3"},
            {_id: "9", name: "Yahourt x 12", price : 3.76, description : loremIpsum, categoryId: "3"},
            {_id: "10", name: "Petit suisse x 12", price : 1.94, description : loremIpsum, categoryId: "3"},
            {_id: "11", name: "Fromage blanc", price : 1.79, description : loremIpsum, categoryId: "3"},
            {_id: "12", name: "Beurre", price : 2.39, description : loremIpsum, categoryId: "3"},
            {_id: "13", name: "Crème fraîche", price : 0.07, description : loremIpsum, categoryId: "3"},

            // fruits & légumes
            {_id: "14", name: "Mandarines 2kg", price : 3.39, description : loremIpsum, categoryId: "4"},
            {_id: "15", name: "Pommes 1kg", price : 3.99, description : loremIpsum, categoryId: "4"},
            {_id: "16", name: "Poires 4 pcs", price : 4.39, description : loremIpsum, categoryId: "4"},
            {_id: "17", name: "Kiwi 6 pcs", price : 3.89, description : loremIpsum, categoryId: "4"},
            {_id: "18", name: "Poireaux 500g", price : 2.89, description : loremIpsum, categoryId: "4"},
            {_id: "19", name: "Chou rouge", price : 2.29, description : loremIpsum, categoryId: "4"},
            {_id: "20", name: "Carottes 1.5kg", price : 2.99, description : loremIpsum, categoryId: "4"},
            {_id: "21", name: "Pommes de terre 2.5kg", price : 5.49, description : loremIpsum, categoryId: "4"},

            // bébé
            {_id: "22", name: "Lait 1er age", price : 18.85, description : loremIpsum, categoryId: "5"},
            {_id: "23", name: "Petits pots x 2", price : 1.94, description : loremIpsum, categoryId: "5"},
            {_id: "24", name: "Céréales en poudre", price : 2.95, description : loremIpsum, categoryId: "5"},
            {_id: "25", name: "Couches x 70", price : 22.77, description : loremIpsum, categoryId: "5"},

            // entretien
            {_id: "26", name: "Lessive", price : 11.40, description : loremIpsum, categoryId: "6"},
            {_id: "27", name: "Eponges", price : 1.80, description : loremIpsum, categoryId: "6"},
            {_id: "28", name: "Liquide vaisselle", price : 1.33, description : loremIpsum, categoryId: "6"},
        ];
   },*/

    getAll : async function() {
        return this.getProducts()
    },

    getProducts : async function() {
        //1 - Connexion à la BDD
        await client.connect();
        //2 - Selection de la BDD
        const database = client.db(dbName);
        //3 - Selection des collections
        const productsCollection = database.collection('products');
        //4 - Recuperation des documents
        return  products = await productsCollection.find().toArray();
    },

   getProductById : async function(categoryId) {
       let products = await this.getAll();
       for(let k=0; k<products.length; k++){
           let productId = products[k]._id;
           let myObjectId = new ObjectId(categoryId);
           if( myObjectId.equals(productId)){
               return products[k];
           }
       }
    }
}

module.exports = Product;
