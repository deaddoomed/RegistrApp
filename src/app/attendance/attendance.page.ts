import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceService } from '../services/attendance_service';
import { IAttendance } from '../models/IAttendance';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [AttendanceService]
})
export class AttendancePage implements OnInit {

  attendanceInfoReceived$: any[] = [];
  idUserHtmlRouterLink: any;
  subjectnameModal: any;
  attendanceInfo: IAttendance={
    date:"",
    numrun:0,
    cod_subject:0,
  }
  attendance_classCodes: any[] = [];

  constructor(private route : Router, private _attendanceService : AttendanceService) {
    this.attendanceInfo = this.route.getCurrentNavigation()?.extras.state?.['classInfo'];
    
    //GETTING SUBJECT NAME    
    this._attendanceService.getSubjectInfo(this.attendanceInfo.cod_subject).subscribe(
      (data)=>{        
          this.subjectnameModal=data[0].subject_name;
      }
    );
        
    //GETTING ATTENDANCES INFO IN [DATE STATUS] FORMAT
   
    this._attendanceService.getAttendance(this.attendanceInfo.cod_subject,this.attendanceInfo.numrun).subscribe(
      (data : any) => {
        this._attendanceService.getSubjectName(this.attendanceInfo.cod_subject).subscribe(response =>console.log("registering for: "+response));
        if(data.length > 0){          
          for(let i in data){
            this.attendanceInfoReceived$.push(data[i]);
          }
        }
        else{
          console.log("there's no attendances for "+this.subjectnameModal);
        }           
    });
  
  }

  ngOnInit() {
     
  }

  backStudent() {
    this.attendanceInfo.cod_subject = 0;
    this.route.navigate(['/alumno'], {state:{userInfo: this.attendanceInfo.numrun}})
  }
}
