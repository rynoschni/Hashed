'use strict'
const express = require('express'),
    app = express(),
    http = require('http'),
    hostname = '127.0.0.1',
    port = 3333,
    path = require('path'),
    es6Renderer = require('express-es6-template-engine'),
    helmet = require('helmet'),
    morgan = require('morgan'),
    session = require('express-session'),
    cookieParser = require('cookie-parser');

app.engine('html', es6Renderer)
app.set('views', './views')
app.set('view engine', 'html')

const logger = morgan('tiny')
app.use(logger)


app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(
    session({
        secret: "not get rad",
        resave: false,
        saveUninitialized: true,
        is_logged_in: false
    })
)

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Listening at ${hostname}:${port}`)
});

const rootController = require('./routes/index');
const userController = require('./routes/user');
const shoppingController = require('./routes/groceryList');
const pantryController = require('./routes/pantryList');
const updateController = require('./routes/updateList');
const groceryAddController = require('./routes/groceryListAdd')
const groceryListUpdate = require('./routes/groceryListDone')
const groceryListLink = require('./routes/groceryPantryLink')
const recipesController = require('./routes/recipesList');
const pantryAddController = require('./routes/pantryAdd');
const pantryMoveController = require('./routes/pantryMove')
const recipeGroceryAddController = require('./routes/recipeGrocAdd')
const updatingShoppingController = require('./routes/updateShoppingList')
const homeController = require('./routes/home');


app.use('/', rootController);
app.use('/login', rootController);
app.use('/signup', userController);
app.use('/grocery', shoppingController);
app.use('/grocery/add', groceryAddController);
app.use('/grocery/update', groceryListUpdate);
app.use('/grocery/link', groceryListLink);
app.use('/home', homeController);
app.use('/pantry', pantryController);
app.use('/update', updateController);
app.use('/recipes', recipesController);
app.use('/recipes/add', recipesController);
app.use('/pantry/add', pantryAddController);
app.use('/pantry/move',pantryMoveController)
app.use('/recipes/addToGrocery', recipeGroceryAddController)
app.use('/grocery/updated', updatingShoppingController)
