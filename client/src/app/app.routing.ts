import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importar user
import { UserEditComponent } from './components/user-edit.component';
import { HomeComponent } from './components/home.component';
//importar artistas
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail.component';
//importar albums
import { AlbumListComponent } from './components/album-list.component';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail.component';
//importar song componentes
import { SongAddComponent } from './components/song-add.component';
import { SongEditComponent } from './components/song-edit.component';
//array de rutas
const appRoutes: Routes = [
	{path: '', component: HomeComponent },
	{path: 'editar-tema/:id', component: SongEditComponent },
	{path: 'crear-tema/:album', component: SongAddComponent },
	{path: 'albums/:page', component: AlbumListComponent},
	{path: 'editar-album/:id', component: AlbumEditComponent},
	{path: 'crear-album/:artist', component: AlbumAddComponent },
	{path: 'artistas/:page', component: ArtistListComponent },
	{path: 'crear-artista', component: ArtistAddComponent },
	{path: 'editar-artista/:id', component: ArtistEditComponent},
	{path: 'artista/:id', component: ArtistDetailComponent},
	{path: 'album/:id', component: AlbumDetailComponent},
	{path: 'mis-datos', component: UserEditComponent},
  {path: '**', component:HomeComponent}
];

//exportar la configurcion de rutas y el array de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
