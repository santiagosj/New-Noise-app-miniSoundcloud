import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss','../assets/styles/buttons.scss'],
  providers: [UserService]
})

export class AppComponent implements OnInit {
  public title = 'NEW NOISE';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public messageErr;
  public alertRegister;
  public url:string;

  constructor(
    //instancia de servicios
    private _userService:UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.user = new User('','','','','','ROLE_USER',''); //instancia del objeto user
    this.user_register = new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.identity= this._userService.getIdentity();
    this.token= this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);
  }

  public onSubmit(){
    console.log(this.user);
 // obtengo los datos del usuario identficado
    this._userService.singUp(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;
      console.log(this.identity);

    if(!this.identity._id){
        alert("El usuario no está correctamente identificado");
    }else{
      //crear elemento en el localstorage para mantener al usuario logueado
        localStorage.setItem('identity', JSON.stringify(identity));
      //conseguir el token para enviarlo a cada peticion http
      this._userService.singUp(this.user, 'true').subscribe(
      response =>{
      let token = response.token;
      this.token = token;


        if(this.token.length <= 0){
          alert("El token no se ha generado correctamente");
        }else{
          //crear elemento en el localstorage para tener el token disponible
         localStorage.setItem('token',token);
          this.user = new User('','','','','','ROLE_USER','');
           //console.log(token);
           //console.log(identity);
        }
     },
     error => {
       var messageErr = <any>error;

       if(messageErr != null){
         var body = JSON.parse(error._body);
         this.messageErr = body.message;

         console.log(error);
        }
      }
    );
  }
},
    error =>{
      var messageErr = <any>error;

      if(messageErr != null){

        var body = JSON.parse(error._body);
        this.messageErr = body.message;
        console.log(error);
       }
     }
   );

  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/'])
  }

  onSubmitRegister(){
    console.log(this.user_register);
     
    this._userService.register(this.user_register).subscribe(
      response => {
      let user = response.user;
      this.user_register = user;

      if(!user._id){
        this.alertRegister = 'Error al registrarse';
      }else{
        this.alertRegister = 'Felicitaciones está registrado';
        this.user_register = new User('','','','','','ROLE_USER','');
      }
    },
    error => {
      var messageErr = <any>error;
      if(messageErr != null){
        var body = JSON.parse(error._body);
        this.alertRegister = body.message;

        console.log(error);
        }
      }
    );
  }

}
