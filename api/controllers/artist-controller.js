'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res){
  var artistId = req.params.id;

  Artist.findById(artistId, (err, artist) =>{
    if (err) {
  res.status(500).send({message:'Error en el servidor'});
    } else {
      if (!artist) {
        res.status(404).send({message:'Error al obtener el artista'});
      } else {
        res.status(200).send({artist});
      }
    }
  })
}

function getArtists(req, res){
  if (req.params.page) {
    var page = req.params.page;
  } else {
    var page = 1;
  }
  var itemsPerPage = 4;

  Artist.find().sort('name').paginate(page,itemsPerPage, function(err, artists, total){
    if (err) {
      res.status(500).send({message:'Error al cargar artistas'});
    } else {
      if (!artists) {
        res.status(404).send({message:'No hay artistas'});
      } else {
        return res.status(200).send({
          total_items:total,
          artists: artists
        })
      }
    }
  });
}


function saveArtist(req, res){

  var artist = new Artist();//el objeto modelo
  var params = req.body;//guarda la informacion que obtiene del usuario
//le asigno al modelo
  artist.name = params.name;
  artist.description = params.description;
  artist.image = 'null';

  artist.save((err, artistStored) => {
    if (err) {
      res.status(500).send({message:'El artista no pudo ser guardado'});
    } else {
      if (!artistStored) {
        res.status(404).send({message:'Error al guardar el artista'});
      } else {
        res.status(200).send({artist: artistStored});
      }
    }
  })

}

function updateArtist(req, res){
  var artistId = req.params.id;
  var update = req.body;

  Artist.findByIdAndUpdate(artistId,update,(err, artistUpdated)=>{
    if (err) {
      res.status(500).send({message:'El artista no pudo ser actualizado'});
    } else {
      if (!artistUpdated) {
          res.status(404).send({message:'Error al actualizar el artista'});
      } else {
        res.status(200).send({artist: artistUpdated});
      }
    }
  })
}

function deleteArtist(req, res){
  var artistId = req.params.id;

  Artist.findByIdAndRemove(artistId, (err, artistRemoved)=>{
    if (err) {
        res.status(500).send({message:'El artista no pudo ser Eliminado'});
    } else {
      if (!artistRemoved) {
        res.status(404).send({message:'Error al Eliminar el artista'});
      } else {

        Album.find({artist: artistRemoved._id}).remove((err,albumRemoved) => {
          if (err) {
              res.status(500).send({message:'El artista no pudo ser Eliminado'});
          } else {
            if (!artistRemoved) {
              res.status(404).send({message:'Error al Eliminar el artista'});
            } else {
              Song.find({artist: artistRemoved._id}).remove((err,songRemoved) => {
                if (err) {
                    res.status(500).send({message:'El artista no pudo ser Eliminado'});
                } else {
                  if (!artistRemoved) {
                    res.status(404).send({message:'Error al Eliminar el artista'});
                  } else {
                    res.status(200).send({artistRemoved});
                  }
               }
            });
          }}})}}})}


//metodos para las imagenes


          function uploadImage(req, res){
            var artistId = req.params.id;
            var file_name='No subido..';

            if (req.files) {
              var file_path = req.files.image.path;
              var file_split = file_path.split('\\');
              var file_name = file_split[2];

              var ext_split = file_name.split('\.');
              var file_ext= ext_split[1];

              if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
                  Artist.findByIdAndUpdate(artistId,{image: file_name},(err, artistUpdated) =>{
                    if (!artistId) {
                      res.status(404).send({message:'No se ha podido actualizar el usuario'});
                    }else {
                      res.status(200).send({artist: artistUpdated});
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
            var path_file = './uploads/artists/'+ imageFile;
            fs.exists(path_file, function(exists){
              if (exists) {
                 res.sendFile(path.resolve(path_file))
              } else {
                res.status(200).send({message:'No existe la imagen...'});
              }
            });
          }

module.exports = {
  getArtist,
  saveArtist,
  getArtists,
  updateArtist,
  deleteArtist,
  uploadImage,
  getImageFile
}
