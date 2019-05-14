import{Component, OnInit}from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UploadService } from '../services/upload.service';
import { UserService } from '../services/user.service';
import { SongService } from '../services/song.service';
import { Song } from '../models/song';

@Component({
  selector: 'song-edit',
	templateUrl: '../views/song-add.html',
	providers: [UserService, SongService, UploadService]
})

export class SongEditComponent implements OnInit{
  public titulo:string;
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _songService:SongService,
    private _uploadService :UploadService
  ){
    this.titulo ='Editar cancion';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song(1,'', '', '', '');
    this.is_edit = true;
  }

  ngOnInit(){
    console.log('componente edit del song cargado');

    this.getSong();
  }

    getSong(){
      this._route.params.forEach((params:Params)=>{
        let id= params['id']

         this._songService.getSong(id).subscribe(
           response=>{
           if(!response.song){
             this._router.navigate(['/']);
           }else{
             this.song = response.song;
             console.log(this.song);
           }
         },
         error=>{
           var messageErr = <any>error;

           if(messageErr != null){
              var body = JSON.parse(error._body);
              this.alertMessage = body.message;

              console.log(error);
            }
         })

      })
    }

  onSubmit(){
    //saco de la url los parametros del id del artista para rellenar el valor artist del objeto Album.
    this._route.params.forEach((params:Params) =>{
      let id = params['id']

      this._songService.editSong(id, this.song).subscribe(
        response=>{

        if(!response.song){
          this.alertMessage = 'Error en el servidor';
        }else{
          this.alertMessage='La canción se ha actualizado correrctamente';
            if(!this.filesToUpload){
              this._router.navigate(['/album', response.song.album]);
            }else{
              //subir el archivo de audio
              this._uploadService.makeFileRequest(this.url+'upload-file-song/'+id, [], this.filesToUpload,this.token,'file')
              .then(
                (resul)=>{
                  this._router.navigate(['/album', response.song.album]);
                },
                (error)=>{
                  console.log(error);
                  }
                );
            }

        }

      },
      error=>{
        var messageErr = <any>error;

        if(messageErr != null){
           var body = JSON.parse(error._body);
           this.alertMessage = body.message;

           console.log(error);
         }
      });
    });
  }

  public filesToUpload;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
 }
}
