import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../services/user_service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceService } from '../services/attendance_service';
import { AttendanceModel } from '../models/AttendanceModel';
import { IAttendance } from '../models/IAttendance';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [UserService, AttendanceService]
})
export class AttendancePage implements OnInit {

  attendanceInfoReceived$: any;
  idUserHtmlRouterLink: any;
  attendanceInfo: IAttendance={
    date:"",
    numrun:0,
    cod_class:0,
  }

  constructor(private route : Router, private _userService: UserService, private _attendanceService : AttendanceService) {
    this.attendanceInfo = this.route.getCurrentNavigation()?.extras.state?.['classInfo'];    
    this.attendanceInfoReceived$ = this._attendanceService.getAttendance(this.attendanceInfo.cod_class,this.attendanceInfo.numrun);
   }

  ngOnInit() {
        
  }


  backStudent() {
    this.route.navigate(['/alumno'], {state:{userInfo: 11222333}})
  }
}
