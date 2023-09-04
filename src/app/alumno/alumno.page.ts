import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
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
  idUserHtmlRouterLink: any;

  constructor(private route : Router, private activatedRoute: ActivatedRoute) {
    this.studentInfoReceived = this.route.getCurrentNavigation()?.extras.state?.['user'];
    this.idUserHtmlRouterLink = this.activatedRoute.snapshot.params['id'];

    console.log(this.idUserHtmlRouterLink);
   }

  ngOnInit() {

  }

  backLogin() {
    this.route.navigate(['/login']);
  }

}
