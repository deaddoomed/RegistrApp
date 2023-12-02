import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import { IAttendance } from '../models/IAttendance';

@Component({
  selector: 'app-attendanceread',
  templateUrl: './attendanceread.page.html',
  styleUrls: ['./attendanceread.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AttendancereadPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];

  attendanceInfo: IAttendance={
    date:"",
    numrun:0,
    cod_subject:0,
  }

  constructor(private route : Router, private alertController : AlertController) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then(
      (response) => {this.isSupported = response.supported;}
    );
  }

  async requestPermissions(): Promise<boolean>{
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';    
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create(
      {
        header: 'Permission denied',
        message: 'Please grant camera permissions to use this functionality',
        buttons: ['OK']
      }
    );
    await alert.present();
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted){
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  backStudent() {
    this.attendanceInfo.cod_subject = 0;
    this.route.navigate(['/alumno'], {state:{userInfo: this.attendanceInfo.numrun}})
  }

}
