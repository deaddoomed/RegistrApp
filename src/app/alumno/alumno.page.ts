import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AlumnoPage implements OnInit {

  studentInfoReceived: UserModel | undefined;

  constructor(private route : Router) {
    this.studentInfoReceived = this.route.getCurrentNavigation()?.extras.state?.['user'];
   }

  ngOnInit() {
  }

}
