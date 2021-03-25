const User = require('../models/user.js');
const Recipe = require('../models/recipe');

module.exports = {
    signin: signin,
    saveUser: saveUser,
    showProfile: showProfile,
    showeditAcc:showeditAcc,
    saveeditinfo:saveeditinfo,
    logout:logout,
    changepwd: changepwd,
    dischangepwd:dischangepwd
}

// signin
function signin(req, res) {
    User.findOne({
        email: req.body.email,
        pwd: req.body.pwd}, (err, user) => {
            if(!user || err) {
                res.redirect('/signin');
            }else{
                req.session.user = user._id; //set for session - to stay logged in
                req.session.username = user.username;
                req.session.logged = true;
                res.redirect(`/profile/${user._id}`);
            }
        });
}

// Saving the changed password 
function changepwd(req, res) {
    
    User.updateOne({ slug: req.params.slug },{
        "pwd": req.body.pwd
    }, (err, user) => {
       if (err) {
                res.status(404);
                res.send('Recipe not found!');
            }else{
            res.redirect(`/profile/${req.session.user}`);
            }
    });
}

// Rendering the Change password page
function dischangepwd(req, res) {
            res.render(`pages/changepwd`, {
                title: "Change Password",
                css: '',
                js: '',
                slug: req.params.slug
            });
}

//Sacing the edited account info 
function saveeditinfo(req, res) {
    User.updateOne({ slug: req.params.slug },
        { 
            "fname": req.body.fname,
            "lname" : req.body.lname,
            "email" : req.body.email,
            "username": req.body.username,

    
        }, (err, user) => {
            if (err) {
                res.status(404);
                res.send('Recipe not found!');
            }else{
            res.redirect(`/profile/${req.session.user}`);
            }

            
        });
}

// The logout function 
function logout(req,res){
    req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  
            res.redirect('/');  
        }  
    });  
}

//Displaying the edited account
function showeditAcc(req, res) {

    //Get recipe 
    User.findOne({ slug: req.params.slug }, (err, user) => {
        if (err) {
            res.status(404);
            res.send('Recipe not found!');
        }
        
        res.render('pages/editacc', {
            title: user.username,
            css: '',
            js: '',
            user: user
        });
    });
}

// register
function saveUser(req, res) {

    const newUser = new User({
        username: req.body.username,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        pwd: req.body.pwd
    });
    newUser.save((err, user) => {
        if (err)
            throw err;
            
        // redirect 
         req.session.user = user._id; //set for session - to stay logged in
         req.session.username = user.username;
        res.redirect(`/profile/${newUser._id}`);
    });
}

// profile 
async function showProfile(req, res) {
    try {
        const recipes = await Recipe.find({ author_id: req.params.userid });

        //If user is logged in:
        if (req.session.user === req.params.userid) {
            User.findOne({ _id: req.session.user }, (err, user) => {
                if (!user || err) {
                    res.status(404);
                    res.send('User not found!');
                }
                res.render('pages/profile', {
                    user: user,
                    recipes: recipes,
                    edit: true, //profile shows edit option
                    title: user.username,
                    css: '',
                    js: ''
                });
            });

        //If user is not logged in:
        } else {
            User.findOne({ _id: req.params.userid }, (err, user) => {
                if (!user || err) {
                    res.status(404);
                    res.send('User not found!');
                }else{
                    res.render('pages/profile', {
                        user: user,
                        recipes: recipes,
                        edit: false, //profile doesn't show edit option
                        title: user.username,
                        css: '',
                        js: ''
                    });
                }
            });
        }
    } catch (err) {
        res.sendStatus(500)
    }
}