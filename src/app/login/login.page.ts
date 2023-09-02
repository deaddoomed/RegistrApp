import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras, RouterLinkWithHref } from '@angular/router';
import { IUserLogin } from '../models/IUserLogin';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref]
})
export class LoginPage implements OnInit {

  //INICIALIZANDO VARIABLES A USAR
  listUser: UserModel[] = [
    new UserModel('GeneCon','Genesis','Contreras',11222333,'genecon123','student'),
    new UserModel('JorgGom','Jorge','Gomez',99888777,'jorgo98','teacher')
  ];

  userLoginModal: IUserLogin = {
    user: '',
    pass: ''
  };

  constructor( private route : Router) { }
  
  //REINICIA VARIABLE USERLOGINMODAL
  ngOnInit() {
    this.userLoginModalRestart();
  }

  userLoginModalRestart(): void {
    this.userLoginModal.user = '';
    this.userLoginModal.pass = '';
  }

  userLogin(userLoginInfo: IUserLogin): boolean{
    for(let n = 0; n < this.listUser.length; n++){
      if ( (this.listUser[n].user == userLoginInfo.user) && (this.listUser[n].pass == userLoginInfo.pass)) {
        let userInfoSend : NavigationExtras = {
          state: {user : this.listUser[n]}
          }

        if (this.listUser[n].type == 'student'){
          let sendInfo = this.route.navigate(['/alumno'],userInfoSend);
          return true;
        }
        if (this.listUser[n].type == 'teacher'){
          let sendInfo = this.route.navigate(['/docente'],userInfoSend);
          return true;
        }
      }
    }
    return false;
  }

}