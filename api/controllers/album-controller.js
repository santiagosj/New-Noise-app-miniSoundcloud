'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');


var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req, res){
  var albumId = req.params.id;

Album.findById(albumId).populate({path:'artist'}).exec((err, album)=>{
  if (err) {
      res.status(500).send({message:'Error en el servidor'});
  }else {
    if (!album) {
      res.status(404).send({message:'El album no existe'});
    } else {
      res.status(200).send({album});
    }
  }
})

}

function saveAlbum(req, res){
  var album = new Album();

  var params = req.body;

  album.title = params.title;
  album.description = params.description;
  album.year = params.year;
  album.image = 'null';
  album.artist = params.artist;

  album.save((err, albumStored)=>{
    if (err) {
      res.status(500).send({message:'Error en el servidor'});
    }else {
      if (!albumStored) {
        res.status(404).send({message:'Error en la transmisión de datos'});
      } else {
         res.status(200).send({album:albumStored});
      }
    }
  });

}

function getAllAlbums(req, res){
  if(req.params.page){
    var page = req.params.page;
  }else{
    var page = 1;
  }
  var itemsPerPage = 4;

  Album.find().sort('name').paginate(page,itemsPerPage, function(err,albums,total){
    if(err){
      res.status(500).send({message:"Error al cargar albums"});
    }else{
      if(!albums){
        res.status(404).send({message:"No hay Albums"});
      }else{
        return res.status(200).send({
          total_items:total,
          albums:albums
        })
      }
    }
  });
}

function getAlbums(req, res){
  var artistId = req.params.artist;

  if (!artistId) {

    var find = Album.find({}).sort('title');
  }else {

    var find = Album.find({artist:artistId}).sort('year');
  }

  find.populate({path:'artist'}).exec((err, albums)=>{
    if (err) {
        res.status(500).send({message:'Error en el servidor'});
    } else {
      if (!albums) {
          res.status(404).send({message:'No hay albums'});
      } else {
          res.status(200).send({albums});
      }
    }
  });
}

function updateAlbum(req,res){
  var albumId = req.params.id;
  var update = req.body;

  Album.findByIdAndUpdate(albumId, update, (err, albumUpdated)=>{
    if (err) {
        res.status(500).send({message:'Error en el servidor'});
    } else {
      if (!albumUpdated) {
          res.status(404).send({message:'El album no se pudo acutualizar!'});
      } else {
          res.status(200).send({album:albumUpdated});
      }
    }
  })
}

function deleteAlbum(req,res){
  var albumId = req.params.id;

  Album.findByIdAndRemove(albumId, (err,albumRemoved) => {
    if (err) {
        res.status(500).send({message:'El artista no pudo ser Eliminado'});
    } else {
      if (!albumRemoved) {
        res.status(404).send({message:'Error al Eliminar el artista'});
      } else {
        Song.find({album: albumRemoved._id}).remove((err,songRemoved) => {
          if (err) {
              res.status(500).send({message:'El artista no pudo ser Eliminado'});
          } else {
            if (!songRemoved) {
              res.status(404).send({message:'Error al Eliminar el artista'});
            } else {
              res.status(200).send({album:albumRemoved});
            }
         }
      });
    }}});
}

function uploadImage(req, res){
  var albumId = req.params.id;
  var file_name='No subido..';

  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];

    var ext_split = file_name.split('\.');
    var file_ext= ext_split[1];

    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
        Album.findByIdAndUpdate(albumId,{image: file_name},(err, albumUpdated) =>{
          if (!albumUpdated) {
            res.status(404).send({message:'No se ha podido actualizar el usuario'});
          }else {
            res.status(200).send({album:albumUpdated});
          }
        });
    } else {
      res.status(200).send({message:'La extencion de archivo no es valida!'});
    }

    console.log(ext_split);
  } else {
    res.status(200).send({message:'No has subido ninguna imagen...'});
  }
}

//obtener la imagen

function getImageFile(req, res){
  var imageFile = req.params.imageFile;
  var path_file = './uploads/albums/'+ imageFile;
  fs.exists(path_file, function(exists){
    if (exists) {
       res.sendFile(path.resolve(path_file))
    } else {
      res.status(200).send({message:'No existe la imagen...'});
    }
  });
}
module.exports = {
  getAlbum,
  saveAlbum,
  getAlbums,
  getAllAlbums,
  updateAlbum,
  deleteAlbum,
  uploadImage,
  getImageFile
}
