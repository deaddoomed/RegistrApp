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
  
  constructor(private route : Router) { }

  ngOnInit() {
  }

  goToUserInfo() {
    this.route.navigate(['/userinfo'], {state:{userInfo: this.registerModal}})
  }

  backLogin() {
    this.route.navigate(['/login']);
  }
}
