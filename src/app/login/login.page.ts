import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLinkWithHref } from '@angular/router';
import { IUserLogin } from '../models/IUserLogin';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../services/user_service';
import { UserModel } from '../models/UserModel';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref]
})
export class LoginPage implements OnInit, OnDestroy{

  userLoginModal: IUserLogin = {
    username: '',
    password: ''
  };

  constructor(private route: Router, private _usuarioService: UserService) { }

  public userExists?: UserModel;
  public userList: UserModel[] = [];
  
  //REINICIA VARIABLE USERLOGINMODAL
  ngOnInit() {
    this.userLoginModalRestart();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  userLoginModalRestart(): void {
    this.userLoginModal.username = '';
    this.userLoginModal.password = '';
  }

  async setObject(user: UserModel) {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  //FUNCION DE LOGUEO
  async userLogin(userLoginInfo: IUserLogin){
    const user_id = await lastValueFrom(this._usuarioService.getLoginUser(userLoginInfo));
    console.log(user_id);
    if (user_id) {
      console.log("Usuario existe...");
      this.route.navigate(['/user-type-menu'], { state: { userInfo: user_id}})
    } else {
      //NO EXISTE
      console.log("Usuario no existe...");
    }
  }

}