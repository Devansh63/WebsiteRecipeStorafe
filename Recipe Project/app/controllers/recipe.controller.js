const Recipe = require('../models/recipe'); //Get model
var fs = require('fs');
var path = require('path');

module.exports = {
    showPosts: showPosts,
    showRecipe: showRecipe,
    seedRecipes: seedRecipes,
    searchRecipes: searchRecipes,
    saveRecipes: saveRecipes,
    editRecipe: editRecipe,
    saveeditrecipe: saveeditrecipe,
    deleteRecipe:deleteRecipe
}

//Display recipe feed page
function showPosts(req, res) {
    
    //Get all recipes that are not private
    Recipe.find({ private: false }, (err, recipes) => {
        if (err) {
            res.status(404);
            res.send('Recipes not found');
        }
        res.render('pages/posts', {
            title: 'Delish · Discover Recipes',
            css: '',
            js: '',
            recipes: recipes
        });
    });
}

//Edit Recipe 
function editRecipe(req, res) {
    //Get recipe 
    Recipe.findOne({ slug: req.params.slug }, (err, recipe) => {
        if (err) {
            res.status(404);
            res.send('Recipe not found!');
        }
        
        res.render('pages/editrecipe', {
            title: recipe.name,
            css: '',
            js: '',
            recipe: recipe
        });
    });
}

//Delete Recipe
function deleteRecipe(req, res) {
    //Get recipe 
    Recipe.deleteOne({ slug: req.params.slug }, (err, recipe) => {
        if (err) {
            res.status(404);
            res.send('Recipe not found!');
        }
        
        res.redirect(`/profile/${req.session.user}`);
    });
}

//Saving the edited recipe
function saveeditrecipe(req,res){
    let pri = true;
    if(req.body.private == "Public"){
        pri = false;
    }
    Recipe.updateOne({ slug: req.params.slug },
    { 
        "name": req.body.name,
        "description" : req.body.description,
        "ingredients" : req.body.ingredients.split(","),
        "directions" : req.body.directions.split("."),
        "prepTime": req.body.prepTime,
        "cookTime": req.body.cookTime,
        "servings": req.body.servings,
        "private" : pri
    }, (err, recipe) => {
        if (err) {
            res.status(404);
            res.send('Recipe not found!');
        }
        //update recipe in DB
        res.redirect('/recipe/' + req.params.slug)
    });
}

//Save New Recipe
function saveRecipes(req, res) {
    let pri = true;
    if(req.body.private == "Public"){
        pri = false;
    }
    const recipe = new Recipe  (
        {   name: req.body.name, 
            author: req.session.username, 
            author_id: req.session.user, 
            description: req.body.description,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            servings: req.body.servings,
            ingredients: req.body.ingredients.split(","),
            directions: req.body.directions.split("."),
            image: req.file.filename,
            private:pri,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/../../public/uploads/' + req.file.filename )), contentType: 'image/jpg'
            }
        });
        recipe.save((err) => {
            if(err){
                console.log("Error saving recipe");
                throw err;
            }
            res.redirect(`/recipe/${recipe.slug}`);
        });
    
}

//Display recipe page
function showRecipe(req, res) {
    //Get recipe 
    Recipe.findOne({ slug: req.params.slug }, (err, recipe) => {
        if (err) {
            res.status(404);
            res.send('Recipe not found!');
        }
        //Check if recipe is a favorite
        let favorite = false;
        res.render('pages/view-recipe', {
            title: recipe.name,
            css: 'view-recipe.css',
            js: '',
            recipe: recipe,
            fav: favorite,
            logged: req.session.logged
        });
    });
}



//Seed database (recipe collection)
function seedRecipes(req, res) {
    //Create recipes
    const recipes = [
        {
            name: 'Pumpkin Roll',
            author: 'AudraB',
            author_id: 'id',
            description: 'This classic pumpkin roll recipe has a soft pumpkin cake filled with rich, silky cream cheese frosting.',
            prepTime: 20,
            cookTime: 15,
            servings: '8-10',
            private: false,
            ingredients: ['1 c. flour', ' 1 tsp baking powder' ],
            directions: ['Mix together flour, baking powder, baking soda, spices, eggs, white sugar, and pumpkin.',
                'Cover a jelly roll pan (10" x 15") with wax paper, make sure the paper is going up and over the sides. Grease and flour the wax paper.',
                'Pour the batter into the pan, spread evenly. Sprinkle walnuts in batter.',
                'Bake at 375 for 13-15 minutes.',
                'Right after pulling it out of the oven, turn the cake over on a towel, remove wax paper, and roll cake in towel (starting from short end). Let cool.',
                'Combine cream cheese, powdered sugar, butter, and vanilla. Stir until smooth.',
                'On a flat surface, gently unroll the cooled cake. Be careful not to break the cake.',
                'Spread cream cheese filling on top of cake. Leave a 1/2 inch gap around edges to avoid spill over.',
                'Re-roll cake and wrap in plastic wrap or foil. Chill in refridgerater for at least an hour.'],
            image: '/images/pumpkin-roll.jpg'
        },

        {
            name: 'Wassail',
            author: 'AudraB',
            author_id: 'id',
            description: 'Holiday drink',
            prepTime: 5,
            cookTime: 15,
            servings: '20+',
            private: false,
            ingredients: ['1 g. cranberry juice', ' 2 g. apple juice' ],
            directions: ['step 1', 'step 2', 'step 3', 'step 4'],
            image: '/images/wassail.jpg'
        },
        {
            name: 'Fudge Brownies',
            author: 'admin',
            author_id: 'id',
            description: 'This brownie recipe yields the fudgiest homemade brownies you will ever try.',
            prepTime: 5,
            cookTime: 15,
            servings: '20+',
            private: false,
            ingredients: ['2 eggs', ' 1 stick of butter' ],
            directions: ['step 1', 'step 2', 'step 3', 'step 4'],
            image: '/images/brownie.jpg'
        },
        {
            name: 'Peanut Butter Cookies',
            author: 'admin',
            author_id: 'id',
            description: 'Fun peanut butter cookie variations.',
            prepTime: 5,
            cookTime: 15,
            servings: '20+',
            private: false,
            ingredients: ['2 eggs', ' 1 stick of butter'],
            directions: ['step 1', 'step 2', 'step 3', 'step 4'],
            image: '/images/cookies.jpg'
        },
        {
            name: 'Bruschetta Stuffed Avocados',
            author: 'admin',
            author_id: 'id',
            description: 'Take creamy avocados to a different level with Bruschetta Stuffed Avocados!',
            prepTime: 5,
            cookTime: 15,
            servings: '20+',
            private: false,
            ingredients: ['2 large tomatoes diced', '1/4 c finely chopped red onion'],
            directions: ['step 1', 'step 2', 'step 3', 'step 4'],
            image: '/images/avacado.jpg'
        }

    ];

    Recipe.deleteMany({}, () => {
        for (let recipe of recipes) {
            let newRecipe = new Recipe(recipe);
            newRecipe.save();
        }
    });

    res.send('Database seeded!');
}

// search recipes 
function searchRecipes(req, res) {
    try {
        Recipe.find({$or: [{name: {'$regex': req.query.q}}, 
            {author: {'$regex': req.query.q}},
            {description: {'$regex': req.query.q}},
            {directions: {'$regex': req.query.q}}]}, (err, recipes) => {
                if (err) {
                    res.status(404);
                    res.send('search error');
                }
                else {
                    res.render('pages/posts', {
                        title: 'Delish · Discover Recipes',
                        css: '',
                        js: '',
                        recipes: recipes
                    });
                }
            })
    }
    catch(err) {
        console.log(error);
    }
}