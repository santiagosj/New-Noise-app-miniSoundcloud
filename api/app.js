'use strict'

var express = require('express');// importa express para generar rutas
var bodyParser = require('body-parser');//importa body parser

var app = express();//instancia express

//cargar  rutas
var user_routes = require('./routes/user-routes');
var artist_routes = require('./routes/artist-routes');
var album_routes = require('./routes/album-routes');
var song_routes = require('./routes/song-routes');
//parsea recorre y analiza la base de datos
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configuracion de cabezeras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);
//exporta el modulo para usarlo en el index.js
module.exports = app;
