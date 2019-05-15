import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Album } from '../models/album';


@Injectable() //decorador

export class AlbumService {
  public url:string;


  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

//get alubum   
getAlbum(token, id:string):Observable<any>{
  //configuracion de cabeceras 
  let headers = new HttpHeaders({'Content-Type':'application/json',
  'Authorization':token})
  //devuelve el album con su respectivo id
  return this._http.get(this.url +'album/'+id, {headers:headers})
}


getAlbums(token, artistId = null):Observable<any>{
//configuracion de cabeceras 
  let headers = new HttpHeaders({'Content-Type':'application/json',
  'Authorization':token})
   //si el id del artista es null devuelve todos los discos en la base de datos, sino devuelve los discos del artista
  if(artistId == null){
    return this._http.get(this.url+'albums/',{headers:headers});
  } else {
    return this._http.get(this.url+'albums/'+ artistId,{headers:headers});
  }
  
}


addAlbum(token,album: Album):Observable<any>{
  let json = JSON.stringify(album);
  let params = "json="+json;
  let headers = new HttpHeaders({'Content-Type':'application/json',
  'Authorization':token})

      return this._http.post(this.url+'album', params, {headers: headers})
                      
  }


  editAlbum(token, id:string, album:Album):Observable<any>{
    let json = JSON.stringify(album);
    let params = "json="+json;
    let headers = new HttpHeaders({ 'Content-Type':'application/json',
    'Authorization':token})

     return this._http.put(this.url+'album/'+ id, params, {headers:headers})
                         
  }

  deleteAlbum(token, id:string):Observable<any>{

    let headers = new HttpHeaders({'Content-Type':'application/json',
    'Authorization':token})

        return this._http.delete(this.url+'album/'+id, {headers:headers})
  }

}
