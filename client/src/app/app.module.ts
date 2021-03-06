import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders} from './app.routing';
import { AngularSvgIconModule } from '../../node_modules/angular-svg-icon';
//clases
import { ArtistListComponent } from './components/artist-list.component';
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit.component';
import { HomeComponent } from './components/home.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { AlbumListComponent } from './components/album-list.component';
import { ArtistDetailComponent } from './components/artist-detail.component';
import { AlbumDetailComponent } from './components/album-detail.component';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { SongAddComponent } from './components/song-add.component';
import { SongEditComponent } from './components/song-edit.component';
import { PlayerComponent } from './components/player.component';


@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    HomeComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    AlbumListComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumDetailComponent,
    SongAddComponent,
    SongEditComponent,
    PlayerComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    AngularSvgIconModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
