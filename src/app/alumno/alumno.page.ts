import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AlumnoPage implements OnInit {

  studentInfoReceived: UserModel | undefined;
  menuType: string = 'overlay';

  constructor(private route : Router) {
    this.studentInfoReceived = this.route.getCurrentNavigation()?.extras.state?.['user'];
  }

  ngOnInit() {
  }

  backLogin() {
    this.route.navigate(['/login']);
  }

}
