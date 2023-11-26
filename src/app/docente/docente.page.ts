import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { Router } from '@angular/router';
import { UserService } from '../services/user_service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceService } from '../services/attendance_service';
import { IAttendance } from '../models/IAttendance';
import { AttendanceModel } from '../models/AttendanceModel';
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

  attendance: IAttendance = {
    numrun: 0,
    cod_subject: 0
  };

  constructor(private route : Router, private _userService: UserService, private _attendanceService : AttendanceService) {
    this.user_id = this.route.getCurrentNavigation()?.extras.state?.['userInfo'];

    //GETTING USER INFO
    this.teacherInfoReceived$ = this._userService.getUser(this.user_id);

    //GETTING CLASSES
    this._attendanceService.getClasses(this.user_id).subscribe(
      (classes: any)=>{
        for(let class_element of classes){
          this.subjectsInfo$.push(class_element);               
        }        
      }
    );

    //CONSOLE LOGS
    console.log("userid :"+this.user_id);
    console.log("today: "+this.dateToday.getDate()+"-"+this.dateToday.getMonth());
  }

  ngOnInit() {
  }


  backLogin() {
    this.route.navigate(['/login']);
  }

  createAttendance(cod_subject: number) {
    let attendance_date = this.dateToday.getDate()+"-"+this.dateToday.getMonth();
    this._attendanceService.validateAttendance(cod_subject,attendance_date).subscribe((data)=>{
      if(data){        
        this._attendanceService.getList(cod_subject).subscribe(
          (lists: any) => {
            for(let list of lists){
              let attendance = new AttendanceModel(attendance_date,list.numrun,list.cod_subject);
              this._attendanceService.generateAttendance(attendance);
        }})
      }
    });      
  }

}

