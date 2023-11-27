import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-attendanceread',
  templateUrl: './attendanceread.page.html',
  styleUrls: ['./attendanceread.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AttendancereadPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
