import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Album } from '../models/album';

@Injectable()
export class AlbumService {
  public url:string;


  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

getAlbum(id:string):Observable<any>{
  return this._http.get(this.url +'album'+id)
}

getAlbums():Observable<any>{
  return this._http.get(this.url+'albums');
}


addAlbum(album: Album):Observable<any>{
  let json = JSON.stringify(album);
  let params = "json="+json;
  let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

      return this._http.post(this.url+'albums', params, {headers: headers})
  }


  editAlbum(id:string, album:Album):Observable<any>{
    let json = JSON.stringify(album);
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')

     return this._http.put(this.url+'album/'+ id, params, {headers:headers})
                         
  }

  deleteAlbum(id:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')

        return this._http.delete(this.url+'album/'+id, {headers:headers})
  }

}
