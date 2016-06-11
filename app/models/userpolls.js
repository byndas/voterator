// load the things we need
var mongoose = require('mongoose');
var Chart = require('./chart');

// define the schema for our user poll model
var userPollSchema = mongoose.Schema({

        name        : String,
        option1     : String,
        option2     : String,
        option3     : String,
        option4     : String,
        option5     : String,
        option6     : String,
        option7     : String,
        option8     : String,
        option9     : String
    
});

var userPoll = mongoose.model('userPoll', userPollSchema);

module.exports = function(app) {
    app.post('/new/poll', isLoggedIn ,function(req,res){
        var newPoll = new userPoll();
        newPoll.name    = req.body.poll;
        newPoll.option1 = req.body.opt1;
        newPoll.option2 = req.body.opt2;
        newPoll.option3 = req.body.opt3;
        newPoll.option4 = req.body.opt4;
        newPoll.option5 = req.body.opt5;
        newPoll.option6 = req.body.opt6;
        newPoll.option7 = req.body.opt7;
        newPoll.option8 = req.body.opt8;
        newPoll.option9 = req.body.opt9;
        
        // save the poll
                newPoll.save(function(err) {
                    if (err){throw err;}
                    });
                res.status(200).send(newPoll.id);
                
        });
        
    // =====================================
    // USER POLLS===========================
    // =====================================    
    app.get('/mypolls', isLoggedIn ,function(req,res){
    
    res.render('pages/my',{
    user: req.user
          }); 
    
    });
    
    app.get('/polls',isLoggedIn ,function(req,res){
        mongoose.model('userPoll').find(function(err,data){
           if(err){throw err}
           res.status(200).send(data);
        });
    });
   
    app.post('/delete/:id',isLoggedIn,function(req,res){
        mongoose.model('userPoll').findOne({_id:req.params.id}).remove().exec();
    });
    
    app.get('/:id',isLoggedIn,function(req,res){
        // to validate ObjectId
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) { 
        mongoose.model('userPoll').findOne({_id:req.params.id},function(err,data){
            if(err){throw err;}
            var temp = req.params.id;
            var question = data.name;
            var opt1 = data.option1;
            var opt2 = data.option2;
            var opt3 = data.option3;
            var opt4 = data.option4;
            var opt5 = data.option5;
            var opt6 = data.option6;
            var opt7 = data.option7;
            var opt8 = data.option8;
            var opt9 = data.option9;
            
            res.render('pages/chart',{
            user: req.user,
            id: temp,
            title: question,
            opt1: opt1,
            opt2: opt2,
            opt3: opt3,
            opt4: opt4,
            opt5: opt5,
            opt6: opt6,
            opt7: opt7,
            opt8: opt8,
            opt9: opt9
              }); 
        });
      } else {
          res.redirect('/'); // redirect for all cases when it doesn't match id
      }
    });
    
    app.get("/values/:id", isLoggedIn,function(req,res){
        mongoose.model('Chart').findOne({obm:req.params.id},function(err,data){
           if(err){throw err;}
           if(!data){res.send("first");}
           if(data){res.status(200).send(data);}
        });
    });
   
    app.post("/values/:id", isLoggedIn, function(req,res){
        
        mongoose.model('Chart').findOne({obm:req.params.id},function(err,data){
            
        if(!data){
        var newChart = new Chart();
        newChart.obm = req.params.id;
        newChart.value1 = req.body.value1;
        newChart.value2 = req.body.value2;
        newChart.value3 = req.body.value3;
        newChart.value4 = req.body.value4;
        newChart.value5 = req.body.value5;
        newChart.value6 = req.body.value6;
        newChart.value7 = req.body.value7;
        newChart.value8 = req.body.value8;
        newChart.value9 = req.body.value9;
        
            newChart.save(function(err) {
                    if (err){throw err;}
                    });
                    res.status(200).send("ok");
            }else{
                
        mongoose.model('Chart').findOne({obm:req.params.id},function(err,data){
        if(err){throw err;}    
        data.value1 = req.body.value1;
        data.value2 = req.body.value2;
        data.value3 = req.body.value3;
        data.value4 = req.body.value4;
        data.value5 = req.body.value5;
        data.value6 = req.body.value6;
        data.value7 = req.body.value7;
        data.value8 = req.body.value8;
        data.value9 = req.body.value9;
        
            data.save(function(err) {
                    if (err){throw err;}
                    });
                    res.status(200).send("updated");
              });
            } // else 
           });    
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

