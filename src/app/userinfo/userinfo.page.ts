import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IUser } from '../models/IUser';
import { Router, RouterLinkWithHref } from '@angular/router';
import { IUserLogin } from '../models/IUserLogin';
import { UserService } from '../services/user_service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref, FormsModule,HttpClientModule],
  providers: [UserService]
})
export class UserinfoPage implements OnInit {
  
  registerInfo : IUser = {
    numrun: 0,
    dvrun: 0,
    first_name: "",
    second_name: null,
    p_last_name: "",
    m_last_name: "",
    email: "",
    username: "",
    id_type: 1,
    password: ""
  }

  registerReceived: IUserLogin = {
    email: '',
    password: ''
  };

  constructor(private route : Router, private _usuarioService: UserService) { 
    this.registerInfo = this.route.getCurrentNavigation()?.extras.state?.['userInfo'];
  }    

  ngOnInit() {
  }

  backLogin() {
    this.route.navigate(['/login']);
  }

  registerUser(){    
    this.registerInfo.username=this.registerInfo.first_name;
    this.registerInfo.id_type = 1;
    this._usuarioService.registerUser(this.registerInfo);
    console.log(JSON.stringify(this.registerInfo));
  }
}
