'use strict'

var mongoose = require('mongoose');//para conectar con la base de datos.
var app = require('./app');// importa el app.js (express y body-parser)
var port = process.env.PORT || 3977;//configura el puerto


//conexion a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean2', (err, res) => {
if (err) {
  throw err;
} else {
  console.log('La base de datos está funcionando correctamente!');

  app.listen(port,function(){
    console.log('Servidor del apiRest escuchando en http://localhost:'+ port)
  });
 }
});
