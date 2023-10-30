import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { Router } from '@angular/router';
import { UserService } from '../services/user_service';
import { Observable, map } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceService } from '../services/attendance_service';
import { IAttendance } from '../models/IAttendance';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [UserService, AttendanceService]
})

export class DocentePage implements OnInit {

  teacherInfoReceived$: Observable<UserModel>;
  idUserHtmlRouterLink: any;
  user_id!: number;
  userList: any;
  attendance: IAttendance = {
    date: '',
    numrun: 0,
    cod_class: 0
  };

  constructor(private route : Router, private _userService: UserService, private _attendanceService : AttendanceService) {
    this.user_id = this.route.getCurrentNavigation()?.extras.state?.['userInfo'];
    console.log(this.user_id);
    this.teacherInfoReceived$ = this._userService.getUser(this.user_id);
  }

  ngOnInit() {
  }

  backLogin() {
    this.route.navigate(['/login']);
  }

  createAttendance(attendanceInfo : IAttendance) {
     attendanceInfo = this.attendance;
     this._attendanceService.generateAttendance(attendanceInfo);
     console.log(this.attendance);
  }

}

