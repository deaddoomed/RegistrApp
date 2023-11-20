import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IUserLogin } from '../models/IUserLogin';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref, FormsModule]
})
export class RegisterPage implements OnInit {

  registerModal: IUserLogin = {
    email: '',
    password: ''
  };
  password_validation: string = "";
  password_invalid: boolean = false;
  
  constructor(private route : Router) { }

  ngOnInit() {
    this.password_invalid = false;
  }

  goToUserInfo() {
    if((this.password_validation==this.registerModal.password)&&this.registerModal.password!=""&&this.registerModal.email!=""){
      this.route.navigate(['/userinfo'], {state:{userInfo: this.registerModal}})
    }else{
      this.password_invalid = true;
    }
  }

  backLogin() {
    this.password_invalid = false;
    this.route.navigate(['/login']);
  }
}
