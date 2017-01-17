var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */

router.get('/helloworld', function (req, res) {
  res.render('helloworld', { title: 'Hello, World!'});
});


router.get('/userlist', function (req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function (e, docs) {
    res.render('userlist', {
      "userlist": docs
    });
  });
});

/* GET new user page. */
router.get('/newuser', function (req, res) {
    res.render('newuser', { title: 'Add New User'});
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {

  /* Set internal DB variable */
  var db = req.db;

  // Get our form values. These rely on the name attributes on the inputs
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to database
    collection.insert({
        "username": userName,
        "email": userEmail
    }, function (err, doc) {
            if (err) {
                // It failed, return error
                res.send("Could not add user");
            }
            else {
                //Send to success page
                res.redirect("userlist");
            }
        }
    );
});

module.exports = router;
