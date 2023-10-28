import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { Router } from '@angular/router';
import { UserService } from '../services/user_service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [UserService]
})

export class DocentePage implements OnInit {

  teacherInfoReceived$: Observable<UserModel>;
  idUserHtmlRouterLink: any;
  user_id!: number;
  userList: any;

  constructor(private route : Router, private _userService: UserService) {
    this.user_id = this.route.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(this.user_id);
    this.teacherInfoReceived$ = this._userService.getUser(this.user_id);
  }

  ngOnInit() {
  }

  backLogin() {
    this.route.navigate(['/login']);
  }

}

