import{Component, OnInit}from '@angular/core';
import{Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service'; //?
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';


@Component({
  selector:'album-list',
  templateUrl: '../views/album-list.html',
  styleUrls:['../app.component.scss'],
  providers:[UserService, AlbumService]
})

export class AlbumListComponent implements OnInit{
  public titulo:string;
  public albums:Album[];
  public identity;
  public token;
  public url:string;
  public next_page;
  public prev_page;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService: UserService,
    private _albumService:AlbumService
  ){
     this.titulo ='Albums';
     this.identity = this._userService.getIdentity();
     this.token = this._userService.getToken();
     this.url = GLOBAL.url;
     this.next_page = 1;
     this.prev_page = 1;
  }

  ngOnInit(){
    console.log('Album-list.component cargado');

    this.getAllAlbums();
  }

  getAllAlbums(){
    this._route.params.forEach((params:Params)=>{
      let id = null;
      let page = +params['page'];
      if(!page){
        page = 1;
      }else{
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if(this.prev_page == 0){
          this.prev_page = 1;
        }
      }

      this._albumService.getAllAlbums(this.token,page).subscribe(
        response =>{
          if(!response.albums){
            console.log(response);
            this._router.navigate(['/']);
          }else{
            this.albums = response.albums;
          }
        },error=>{
          var errorMessage = <any>error;

            if(errorMessage != null){
              var body = JSON.parse(error._body);
              errorMessage = body.message;

              console.log(error);
            }
        })
     })
  }

}
