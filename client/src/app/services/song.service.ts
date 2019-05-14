import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Song } from '../models/song';

@Injectable()
export class SongService {
  public url:string;

  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

getSong(id:string):Observable<any>{
  return this._http.get(this.url+'song'+id);
}

getSongs(albumId = null):Observable<any>{
     if(albumId == null){
             return this._http.get(this.url+'songs')
              
      }else{
        return this._http.get(this.url+'songs/'+ albumId)
                   
      }
}

addSong(song: Song):Observable<any>{
  let params = JSON.stringify(song);
  let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  return this._http.post(this.url+'song', params,{headers:headers})                 
  }


  editSong(id:string, song: Song):Observable<any>{
    let params = JSON.stringify(song);
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
     return this._http.put(this.url+'song/'+ id, params, {headers:headers})
                         
  }

  deleteSong(id:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.delete(this.url+'song/'+id, {headers:headers})            
  }

}
