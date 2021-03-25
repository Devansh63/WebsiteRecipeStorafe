module.exports = {

    //Display home page
    showHome: (req, res) => {
        res.render('pages/home', {
            title: 'Delish · Discover Recipes',
            css: '',
            js: ''
        });
    },
    
    
    //Display recipe creation page 
    showReciperDesigner: (req, res) => {
        if(!req.session.user){
            res.redirect('/signin');
        }else{
            res.render('pages/recipedesigner', {
                title: 'Delish · Discover Recipes',
                css: '',
                js: ''
            });
        }
        
    },

    //Display signin page
    showSignin: (req, res) => {
        res.render('pages/signin', {
            title: 'Signin · Discover Recipes',
            css: '',
            js: ''
        });
    },

    //Display registration page
    showRegister: (req, res) => {
        res.render('pages/register', {
            title: 'Register · Discover Recipes',
            css: '',
            js: ''
        });
    }
};
