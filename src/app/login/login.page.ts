import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgForOf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLinkWithHref } from '@angular/router';
import { IUserLogin } from '../models/IUserLogin';
import { Subscription, lastValueFrom } from 'rxjs';
import { UserService } from '../services/user_service';
import { UserModel } from '../models/UserModel';
import { Preferences } from '@capacitor/preferences';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule, HttpClientModule, NgFor, NgForOf],
  providers: [UserService]
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

  //FUNCION QUE PASA ID A LA SIGUIENTE PAGINA
  async userLogin(userLoginInfo: IUserLogin){
    const user_id = await lastValueFrom(this._usuarioService.getLoginId(userLoginInfo));
    console.log(user_id);
    if(user_id){
      this.route.navigate(['/alumno'], {state:{userInfo: user_id}})
    }
    else{
      console.log("usuario no encontrado");
    }
  }

}