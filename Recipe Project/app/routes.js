const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    recipeController = require('./controllers/recipe.controller'),
    userController = require('./controllers/user.controller.js');
    const path = require('path');

    // uploading the image
    let multer = require('multer');
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname + '/../public/uploads/'))
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + ".jpg")
        }
    });
    let upload = multer({ storage: storage });


    //Export reroutes
module.exports = router;

//Middleware - used to check if the user is logged in
let sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect(`/profile/${req.session.user}`);
    } else {
        next();
    }    
};

//Main routes
router.get('/', mainController.showHome);

//Edit account
router.get('/editacc/:slug', userController.showeditAcc);
router.post('/editinfo/:slug', userController.saveeditinfo);

//Log Out
router.get('/logout/:slug',userController.logout);

// signin
router.get('/signin', sessionChecker, mainController.showSignin);
router.post('/signin', userController.signin);

// register 
router.get('/register', mainController.showRegister);
router.post('/register', userController.saveUser)

//Recipe routes
router.get('/posts/seed', recipeController.seedRecipes);
router.get('/posts', recipeController.showPosts);

//Display recipes
router.get('/recipe/:slug', recipeController.showRecipe);

//Recipe Save Route
router.get('/newRecipe', mainController.showReciperDesigner);
router.post('/saveRecipe', upload.single('image'), recipeController.saveRecipes);

//Recipe Edit
router.get('/editrecipe/:slug',recipeController.editRecipe);
router.post('/saveeditrecipe/:slug', recipeController.saveeditrecipe);

//change password
router.get('/changepwd/:slug', userController.dischangepwd);
router.post('/savechangepwd/:slug', userController.changepwd);


//Deleting Recipe
router.get('/deleterecipe/:slug',recipeController.deleteRecipe);

//Search Route
router.get('/search', recipeController.searchRecipes)

// profile routes 
router.get('/profile', sessionChecker, (req, res) => {
    res.redirect('/');
});

//display user profile
router.get('/profile/:userid', userController.showProfile);

