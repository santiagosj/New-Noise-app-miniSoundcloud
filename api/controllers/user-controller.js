'use strict'
  //importo el modelo de usuario
var path = require('path');
var fs = require('fs');
var bcrypt = require('bcrypt-nodejs');//modelo para encriptar password
var User = require('../models/user');//modelo de usuario
var jwt = require('../services/jwt');

function pruebas(req, res){
  res.status(200).send({
    message:'Probando una accion del controlador de usuarios'
  });
}

//metodo para registrar usuario

function saveUser(req, res){
   var user = new User(); //instancia del modelo usuario
   var params = req.body; //request al servidor de los datos que entran por el body
//seteo las variables para rellenar el modelo de usuario
    console.log(params);
   user.name = params.name;
   user.surname = params.surname;
   user.email = params.email;
   user.role = 'ROLE_USER';
   user.image = 'null';

   if (params.password) {
//encriptar la contraseña..
bcrypt.hash(params.password, null, null, function(err, hash){
       user.password = hash;
       if (user.name != null && user.email != null && user.surname != null) {
           //guardar usuario. El metodo save es un metodo de mongoose
           user.save((err, userStored) => {
              if (err) {
                 res.status(500).send({message:'El usuario no pudo guardarse'});
              }else {
                if (!userStored) {
                  res.status(404).send({message:'El usuario no existe'});
                } else {
                  res.status(200).send({user : userStored});
                }
              }
           });
       }else {
         res.status(200).send({message:'Rellena todos los campos'});
       }
});
   }else {
     res.status(200).send({message:'Introduce la contraseña'});
   }
}

//metodo para loguear usuarios.

function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

 User.findOne({email: email.toLowerCase()}, (err, user) => {
   if (err) {
     res.status(500).send({message:'Error en la peticion'});
   }else{
     if (!user) {
       res.status(404).send({message:'El usuario no existe'});
      }else{
       //comprobar contraseña
       bcrypt.compare(password, user.password, function(err, check){
         if (check) {
           //devolver los datos delusuario logeado
           if (params.gethash) {
             res.status(200).send({
               token: jwt.createToken(user)
             });
            } else {
             res.status(200).send({user});
           }
         } else {
           res.status(404).send({message:'El usuario no ha podido loguearse'});
         }
       });
     }
   }
 });
}

//actualizar el usuario

function updateUser(req, res){
  var userId = req.params.id;
  var update = req.body;

  if(userId != req.user.sub){
    return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
  }

  User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
    if(err){
      res.status(500).send({message:'Error al actualizar el usuario'});
    }else {
      if (!userUpdated) {
        res.status(404).send({message:'No se ha podido actualizar el usuario'});
      }else {
        res.status(200).send({user: userUpdated});
      }
    }
  })
}

// subir imagen

function uploadImage(req, res){
  var userId = req.params.id;
  var file_name='No subido..';

  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext= ext_split[1];

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
        User.findByIdAndUpdate(userId,{image: file_name},(err, userUpdated) =>{
          if (!userUpdated) {
            res.status(404).send({message:'No se ha podido actualizar el usuario'});
          }else {
            res.status(200).send({image: file_name, user: userUpdated});
          }
        });
    } else {
      res.status(200).send({message:'La extencion de archivo no es valida!'});
    }

    console.log(ext_split);
  } else {
    res.status(200).send({message:'No has subido ningna imagen...'});
  }
}

//obtener la imagen
function getImageFile(req, res){
  var imageFile = req.params.imageFile;
  var path_file = './uploads/users/'+ imageFile;
  fs.exists(path_file, function(exists){
    if (exists) {
       res.sendFile(path.resolve(path_file))
    } else {
      res.status(200).send({message:'No existe la imagen...'});
    }
  });
}


module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile
};
