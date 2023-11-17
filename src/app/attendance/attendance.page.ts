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

    //GETTING CLASS CODES FROM SUBJECT SELECTED
    this._attendanceService.getClassCodes(this.attendanceInfo.cod_subject).subscribe(
      (data : any)=>{
        for(let classInfo of data){
          this.attendance_classCodes.push(classInfo.cod_class);
        }
        
        //GETTING ATTENDANCES INFO IN [DATE STATUS] FORMAT
        for(var classCode of this.attendance_classCodes){    
          this._attendanceService.getAttendance(classCode,this.attendanceInfo.numrun).subscribe(
            (data : any) => {
              for(let i in data){
                  this.attendanceInfoReceived$.push(data[i]);
                  console.log(data[i]);}           
            })
        }        
      }
    );
    
    //CONSOLE LOGS
    console.log("attendanceInfo: "+ JSON.stringify(this.attendanceInfo));
    if(this.attendance_classCodes.length == 0 ){
      console.log("there's no attendances");
    }

  }

  ngOnInit() {
     
  }


  backStudent() {
    this.route.navigate(['/alumno'], {state:{userInfo: this.attendanceInfo.numrun}})
  }
}
