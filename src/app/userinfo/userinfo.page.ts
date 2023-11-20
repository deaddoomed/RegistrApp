import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IUser } from '../models/IUser';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLinkWithHref, FormsModule]
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

  constructor(private route : Router) { }

  ngOnInit() {
  }

  backLogin() {
    this.route.navigate(['/login']);
  }
}
