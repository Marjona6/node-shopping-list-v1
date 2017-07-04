'use strict';

var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');

var _require = require('./models'),
    ShoppingList = _require.ShoppingList;

// creating the variable Recipes
var Recipes = _require.Recipes;

var jsonParser = bodyParser.json();
var app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList
// so there's some data to look at
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

// creating some items for Recipes
// so there's something to get
Recipes.create('chocolate milk', ['cocoa', 'milk', 'sugar']);
Recipes.create('pico de gallo', ['onions', 'jalapeno peppers', 'tomatoes', 'cilantro']);
Recipes.create('rice pilaf', ['rice', 'oil', 'pasta', 'salt', 'butter']);

// when the root of this router is called with GET, return
// all current ShoppingList items
app.get('/shopping-list', function (req, res) {
    res.json(ShoppingList.get());
});

// when the root of this router is called with GET, return
// all current Recipes items
app.get('/recipes', function (req, res) {
    res.json(Recipes.get());
});

app.listen(process.env.PORT || 8080, function () {
    console.log('Your app is listening on port ' + (process.env.PORT || 8080));
});
