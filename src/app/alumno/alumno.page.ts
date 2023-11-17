import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { Router } from '@angular/router';
import { UserService } from '../services/user_service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceService } from '../services/attendance_service';
import { IAttendance } from '../models/IAttendance';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [UserService, AttendanceService]
})

export class AlumnoPage implements OnInit {

  studentInfoReceived$: Observable<UserModel>;
  subjectsInfoReceived$: any[] = [];
  idUserHtmlRouterLink: any;
  userList: any;
  attendance_id: number = 0;
  attedanceModal: IAttendance={
    numrun:0,
    cod_subject:0,
  }

  constructor(private route : Router, private _userService: UserService, private _attendanceService : AttendanceService) {
    this.attedanceModal.numrun = this.route.getCurrentNavigation()?.extras.state?.['userInfo'];

    //GETTING USER INFO
    this.studentInfoReceived$ = this._userService.getUser(this.attedanceModal.numrun);

    //GETTING USER SUBJECTS
    this._attendanceService.getSubjects(this.attedanceModal.numrun).subscribe(
      (subjects : any) => {
        for(let s in subjects){
            this._attendanceService.getSubjectInfo(subjects[s].cod_subject).subscribe(
              (data) =>{
                this.subjectsInfoReceived$.push(data[0]);
                console.log(data);
              })
        }}
    );

    //CONSOLE LOGS
    console.log("userid: "+this.attedanceModal.numrun );
    
  }

  ngOnInit() {

  }

  backLogin() {
    this.route.navigate(['/login']);
  }

  updateAttendance(attendance_id: number) {
    this._attendanceService.registerAttendance(attendance_id).subscribe((data) => {});
    this.attendance_id = 0;
  }

 searchAttendance(cod_subject: number) {
    this.attedanceModal.cod_subject = cod_subject;
    this.route.navigate(['/attendance'], {state:{classInfo: this.attedanceModal}});
}

}
