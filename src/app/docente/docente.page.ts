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
import { ClassModel } from '../models/ClassModel';

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

  attendance: IAttendance = {
    numrun: 0,
    cod_subject: 0
  };

  class: ClassModel = {
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
        for(let class_element of classes){          

          this._attendanceService.getSubjectInfo(class_element.cod_subject).subscribe(
            (subject: any)=>{              
              this.class.subject_name = subject[0].subject_name;
              this.class.subject_short = subject[0].subject_short; 
              this.class.cod_subject = class_element.cod_subject;
              this.class.day = class_element.day;  

              console.log("this.class: "+JSON.stringify(this.class));
              this.subjectsInfo$.push(this.class);    
              //this.restartISubject(); 
              console.log("this.class: "+JSON.stringify(this.class));
                         
            }
          );          
          
             
        }        
      }
    );

    for(let subject_element of this.subjectsInfo$){
      console.log("subject_element(BEFORE): "+subject_element);
      
      console.log("subject_element(AFTER): "+subject_element);
    };

    //CONSOLE LOGS
    console.log(this.subjectsInfo$);
    console.log("userid :"+this.user_id);
    console.log("today: "+this.dateToday.getDate()+"-"+this.dateToday.getMonth());
  }

  ngOnInit() {
  }

  restartISubject(){
    this.class.cod_subject = 0;
    this.class.day = "";
    this.class.subject_name = "";
    this.class.subject_short = ""
  }

  backLogin() {
    this.route.navigate(['/login']);
  }

  createAttendance(cod_subject: number) {
     this._attendanceService.getList(cod_subject).subscribe((data) => {console.log(data)});
     //console.log("attendancedata :"+JSON.stringify(this.attendance));
  }

}

