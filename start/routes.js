'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', 'JobController.home');

// sign up adn loing route
Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser')

Route.on('login').render('auth.login');

Route.get('/test', () => 'Heyyaa working');

Route.get('/posts', 'PostController.index')

Route.get('/posts/:id', 'PostController.detail')

Route.group(() => {

    Route.get('/addPost', 'PostController.add')
    Route.post('/addPost', 'PostController.saveData')
    Route.get('/edit/:id', 'PostController.getEditPost')
    Route.put('/edit/:id', 'PostController.postEditData')

}).prefix('/post')

Route.group(() => {

    Route.get('/getForm', 'PouchDbController.getData')
    Route.post('/setData', 'PouchDbController.storeData')
    Route.get('/showData', 'PouchDbController.showData')
    Route.get('/delete/:id', 'PouchDbController.removeDoc')

}).prefix('/pouch')