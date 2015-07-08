
var express = require('express');
var bodyParser = require('body-parser');
var knexConfig = require('./knexfile');
var knex = require('knex')(knexConfig);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(__dirname));

app.set('database', knex);
database = app.get('database');
database('grocerylist');

//var groceryList = [];


app.get('/groceryList/:id', function (req, res) {
    var id = req.params.id;
    database('grocerylist').where({id:id}).select().then(function(retrievedListItem) {
        res.send(JSON.stringify({
            name     : retrievedListItem[0].name, 
            price    : retrievedListItem[0].price,
            quantity : retrievedListItem[0].quantity
            }))
        });
});

app.post('/groceryList', function (req, res) {
    console.log('in POST handler');
    console.log('req.body');
    console.log(req.body);
    database('grocerylist').returning('id').insert({
        name     : req.body.name, 
        price    : req.body.price,
        quantity : req.body.quantity
    }).then(function(returnedID) {
        console.log('returnedID:');
        console.log(returnedID);
        res.end(JSON.stringify({
            id       : returnedID, 
            name     : req.body.name, 
            price    : req.body.price, 
            quantity : req.body.quantity
        }))
    })
})

app.put('/groceryList/:id', function (req, res) {
    console.log('in PUT handler');
    console.log('req.body');
    console.log(req.body);
    var id = req.params.id;
    console.log("id: ");
    console.log(id);
    database('grocerylist').where({id:id}).update({
        //id       : id,
        name     : req.body.name, 
        price    : req.body.price,
        quantity : req.body.quantity
    }).then(function () {
        res.end(JSON.stringify({
            id       : id, 
            name     : req.body.name, 
            price    : req.body.price, 
            quantity : req.body.quantity
        }))
    });   
   // console.log('groceryList:'); 
   // console.log(groceryList);
});

app.get('/groceryList', function (req, res) {
	console.log("sending collection");
    database('grocerylist').select().then(function(retrievedList) {
        res.send(retrievedList);
        //console.log("retrievedList:")
        //console.log(retrievedList)
    });
});

app.delete('/groceryList/:id', function (req, res) {
    console.log("in DELETE handerl");
    var id = req.params.id;
    database('grocerylist').where({id:id}).del()
        .then(function () {
            res.send('DELETE request to grocerylist/:id');
        })
});

app.listen(3000);
console.log("Listening on port 3000");

