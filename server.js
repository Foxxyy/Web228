// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://foxxyy:artiom666666@ds141401.mlab.com:41401/foxxydb'); // connect to our database

var Example     = require('./app/js/block.js');

app.get('/', function(req, res) {
    res.sendfile('/dist/index.html');
});
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/example')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var ex = new Example();      // create a new instance of the Bear model
        //bear.name = req.body.name;  // set the bears name (comes from the request)
        ex.name = req.body.name
        ex.author = req.body.author
        ex.description = req.body.description
        ex.picName = req.body.picName
        ex.full = req.body.full

        // save the bear and check for errors
        ex.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Block created!' });
        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Example.find(function(err, examples) {
            if (err)
                res.send(err);

            res.json(examples);
        });
    });

    router.route('/example/:ex_id')

        // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .get(function(req, res) {
            Example.findById(req.params.ex_id, function(err, example) {
                if (err)
                    res.send(err);
                res.json(example);
            });
        })

        .put(function(req, res) {

           // use our bear model to find the bear we want
           Example.findById(req.params.ex_id, function(err, example) {

               if (err)
                   res.send(err);
               //bear.name = req.body.name;  // update the bears info
               example.name = req.body.name
               example.author = req.body.author
               example.description = req.body.description
               example.picName = req.body.picName
               example.full = req.body.full

               // save the bear
               example.save(function(err) {
                   if (err)
                       res.send(err);

                   res.json({ message: 'Block updated!' });
               });
           });
      })

      .delete(function(req, res) {
        Example.remove({
            _id: req.params.ex_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
      });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
