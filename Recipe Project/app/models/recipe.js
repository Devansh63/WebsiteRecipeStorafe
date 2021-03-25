//Recipe Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const recipeSchema = new Schema({
    name: String,
    author: String, 
    author_id: String,
    description: String,
    prepTime: Number,
    cookTime: Number,
    servings: String,
    ingredients: [String],
    directions: [String],
    image: String,
    private:Boolean,
    img: {
        data: Buffer, 
        contentType: String
    },
    slug: {
        type: String,
        unique: true
    }
});

//Middleware
recipeSchema.pre('save', function (next) {
    this.slug = slugify(this.name);
    next();
});

//Create model
const recipeModel = mongoose.model('Post', recipeSchema);

//Export model
module.exports = recipeModel;

//Slugify name
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}
