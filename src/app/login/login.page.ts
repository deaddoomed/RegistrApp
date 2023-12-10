import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgForOf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLinkWithHref, RouterModule } from '@angular/router';
import { IUserLogin } from '../models/IUserLogin';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../services/user_service';
import { UserModel } from '../models/UserModel';
import { Preferences } from '@capacitor/preferences';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, RouterModule,FormsModule, HttpClientModule, NgFor, NgForOf],
  providers: [UserService]
})

export class LoginPage implements OnInit, OnDestroy{

  userLoginModal: IUserLogin = {
    email: '',
    password: ''
  };

  constructor(private route: Router, private _usuarioService: UserService) { }

  public userExists?: UserModel;
  public userList: UserModel[] = [];
  
  //REINICIA VARIABLE USERLOGINMODAL
  ngOnInit() {
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }

  async setObject(user: UserModel) {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  goToRegister(){
    this.route.navigate(['/register']);
  }

  //FUNCION QUE PASA ID A LA SIGUIENTE PAGINA
  async userLogin(userLoginInfo: IUserLogin){
    const user_id = await lastValueFrom(this._usuarioService.getLoginId(userLoginInfo));
    if(user_id){
      const user_type = await lastValueFrom(this._usuarioService.getUserType(user_id));

      if(user_type == 1){
        if(this._usuarioService.isMobile()){
          console.log("usertype : alumno("+user_type+")");
          this.route.navigate(['/alumno'], {state:{userInfo: user_id}})
        }
        else{
          window.alert("La cuenta de alumno requiere funciones de camara, por favor ingrese por la aplicacion movil");
        } 
      }
      if(user_type == 2){
        console.log("usertype : alumno("+user_type+")");
        this.route.navigate(['/docente'], {state:{userInfo: user_id}})
      }      
    }
    else{
      window.alert("Credenciales Incorrectas");
      console.log("usuario no encontrado");
    }
  }

 
}