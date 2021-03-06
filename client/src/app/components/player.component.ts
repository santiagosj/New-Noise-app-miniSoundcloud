import {Component, OnInit} from '@angular/core';
import {Song} from '../models/song';
import {GLOBAL} from '../services/global';

@Component({
	selector: 'player',
	template: `
	

	<div class="audio-file">

		<div class="creditsContainer">

			 <div class="album-image">
			 
		      <span *ngIf="song.album">
		        	<img id="play-image-album" src="{{ url + 'get-image-album/' + song.album.image}}" />
		      </span>

		      <span *ngIf="!song.album">
		        	<img id="play-image-album" src="assets/images/cassette-tape.jpg" />
			   	</span>
				
		   </div>
		 
		   <p>Playing : </p>
		     <span id="play-song-title"> 
			     {{song.name}}
		     </span>
		      ||
		    <span id="play-song-artist">
			    <span *ngIf="song.album.artist">
				    {{song.album.artist.name}}
			    </span>
		    </span>
		</div>

		<audio controls id="player">
			<source id="mp3-source" src="{{ url + 'get-song-file/' + song.file }}" type="audio/mpeg">
			 Tu navegador no es compatible con HTML5
		</audio>

	</div>
	`,
	styleUrls:['../app.component.scss','../../assets/styles/player.scss']
})

export class PlayerComponent implements OnInit{
	public url: string;
	public song;

	constructor(){
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('player cargado');

		var song = JSON.parse(localStorage.getItem('sound_song'));
		
		if(song){
			this.song = song;
		}else{
			this.song = new Song(1, "","","","","");
		}
	}
}
