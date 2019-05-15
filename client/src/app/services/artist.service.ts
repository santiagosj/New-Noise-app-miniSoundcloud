import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService {
  public url:string;


  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

getArtists(token, page):Observable<any>{
  let headers = new HttpHeaders({'Content-Type':'application/json',
  'Authorization':token})
  return this._http.get(this.url+'artists/'+page,{headers:headers});
}

getArtist(token, id: string):Observable<any>{
  let headers = new HttpHeaders({'Content-Type':'application/json',
  'Authorization':token});

  return this._http.get(this.url+'artist/'+id,{headers:headers});
}

addArtist(token, artist:Artist):Observable<any>{
  let params = JSON.stringify(artist);
  let headers = new HttpHeaders({'Content-Type':'application/json',
  'Authorization':token})
  return this._http.post(this.url+ 'artist', params,{headers:headers})         
  }

  editArtist(token, id:string, artist: Artist):Observable<any>{
		let params = JSON.stringify(artist);
		let headers = new HttpHeaders({'Content-Type':'application/json',
    'Authorization':token})
		return this._http.put(this.url+'artist/'+id, params, {headers: headers})
	}

  deleteArtist(token, id: string):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json',
    'Authorization':token});
		return this._http.delete(this.url+'artist/'+id, {headers:headers})
	}

}
