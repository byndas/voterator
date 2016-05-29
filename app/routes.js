'use strict';

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE ===========================
    // =====================================
    app.get('/', function(req, res) {
        res.render('pages/index',{
      isAuthenticated:req.isAuthenticated(),
      user: req.user
   }); 
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('pages/login', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('pages/signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/', isLoggedIn, function(req, res) {
        res.render('pages/index', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    // =====================================
    // EDIT ==============================
    // =====================================
    app.get('/edit', isLoggedIn ,function(req,res){
       res.render('pages/edit',{
       user: req.user
            }); 
    });
    
    app.post('/edit', isLoggedIn,function(req,res,info){
       // changing current password
        var user = req.user;
        var curpassword = req.body.curpassword;
        var newpassword = req.body.newpassword;
        if(user.validPassword(curpassword)){
            user.local.password = user.generateHash(newpassword);
            // update the user
                user.save(function(err) {
                    if (err) {throw err;}
                });
            res.status(200).send("Password successfully changed");
            } else {
            res.status(500).send("Incorrect password");
            }
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
    