import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService {
  public url:string;


  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

getArtists():Observable<any>{
  return this._http.get(this.url+'artists');
}

getArtist(id: string):Observable<any>{
  return this._http.get(this.url+'artist'+id);
}

addArtist(artist:Artist):Observable<any>{
  let params = JSON.stringify(artist);
  let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  return this._http.post(this.url+ 'artist', params,{headers:headers})         
  }

  editArtist(id:string, artist: Artist):Observable<any>{
		let params = JSON.stringify(artist);
		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		return this._http.put(this.url+'artist/'+id, params, {headers: headers})
	}

  deleteArtist( id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		return this._http.delete(this.url+'artist/'+id, {headers:headers})
	}

}
