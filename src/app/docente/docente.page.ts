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
import { ISubject } from '../models/ISubject';

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
  subjectsInfo$: ISubject[] = [];
  idUserHtmlRouterLink: any;
  user_id!: number;
  dateToday: Date = new Date();
  name: string="";
  short: string="";
  attendance: IAttendance = {
    numrun: 0,
    cod_subject: 0
  };
  class: ISubject = {
    subject_name: "",
    cod_subject: 0,
    subject_short: "",
    day: ""
  };

  constructor(private route : Router, private _userService: UserService, private _attendanceService : AttendanceService) {
    this.user_id = this.route.getCurrentNavigation()?.extras.state?.['userInfo'];

    //GETTING USER INFO
    this.teacherInfoReceived$ = this._userService.getUser(this.user_id);

    //GETTING CLASSES
    this._attendanceService.getClasses(this.user_id).subscribe(
      (classes: any)=>{
        for(let c of classes){
          this.class.cod_subject = c.cod_subject;
          this.class.day = c.day;
          // this._attendanceService.getSubjectInfo(c.cod_subject).subscribe(
          //   (subject: any)=>{              
          //     this.name = subject[0].subject_name;
          //     this.short = subject[0].subject_short;              
          //   }
          // );
          // this.class.subject_name = this.name;
          // this.class.subject_short = this.short;  
          this.subjectsInfo$.push(this.class);        
        }        
      }
    );

    //CONSOLE LOGS
    console.log(this.subjectsInfo$);
    console.log("userid :"+this.user_id);
    console.log("today: "+this.dateToday.getDate()+"-"+this.dateToday.getMonth());
  }

  ngOnInit() {
  }

  backLogin() {
    this.route.navigate(['/login']);
  }

  createAttendance(cod_subject: number) {
     this._attendanceService.getList(cod_subject).subscribe((data) => {console.log(data)});
     //console.log("attendancedata :"+JSON.stringify(this.attendance));
  }

}

