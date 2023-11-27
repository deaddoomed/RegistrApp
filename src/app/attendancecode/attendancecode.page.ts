import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AttendanceService } from '../services/attendance_service';
import { HttpClientModule } from '@angular/common/http';
import { IAttendance } from '../models/IAttendance';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-attendancecode',
  templateUrl: './attendancecode.page.html',
  styleUrls: ['./attendancecode.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, QRCodeModule],
  providers: [AttendanceService]
})


export class AttendanceCodePage implements OnInit {

  
  dateToday: Date = new Date();
  QRModal: IAttendance = {
    date:"",
    numrun: 0,
    cod_subject: 0
  };

  QRText: string = "";

  constructor(private route : Router) { 
    this.QRModal = this.route.getCurrentNavigation()?.extras.state?.['QRInfo'];
    this.QRText=JSON.stringify(this.QRModal);
    console.log(this.QRText);

  }

  ngOnInit() {
  }

  backTeacher() {
    this.route.navigate(['/docente'], {state:{userInfo: this.QRModal.numrun}});
  }
}
