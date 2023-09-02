import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DocentePage implements OnInit {

  teacherInfoReceived: UserModel | undefined;

  constructor(private route : Router) { 
    this.teacherInfoReceived = this.route.getCurrentNavigation()?.extras.state?.['user'];
  }

  ngOnInit() {
  }

}
