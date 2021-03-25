const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const favSchema = new Schema({
    recipe_id: String,  //id of recipe favorited
    user_id: String     //id of user who favorited 
});

//Create model
const favModel = mongoose.model('Fav', favSchema);

//Export model
module.exports = favModel;
