import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../services/user_service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceService } from '../services/attendance_service';
import { AttendanceModel } from '../models/AttendanceModel';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [UserService, AttendanceService]
})
export class AttendancePage implements OnInit {

  //attendanceInfoReceived$: Observable<AttendanceModel>;
  idUserHtmlRouterLink: any;
  attendanceInfo: number;
  class_id: number = 0;

  constructor(private route : Router, private _userService: UserService, private _attendanceService : AttendanceService) {
    this.attendanceInfo = this.route.getCurrentNavigation()?.extras.state?.['classInfo'];
    console.log(this.attendanceInfo);
    //this.attendanceInfoReceived$ = this._attendanceService.getAttendance(this.class_id);
   }

  ngOnInit() {
  }


  backStudent() {
    this.route.navigate(['/alumno']);
  }
}
