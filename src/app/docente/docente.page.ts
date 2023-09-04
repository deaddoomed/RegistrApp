import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DocentePage implements OnInit {

  teacherInfoReceived: UserModel | undefined;
  idUserHtmlRouterLink: any;

  constructor(private route : Router, private activatedRoute: ActivatedRoute) { 
    this.teacherInfoReceived = this.route.getCurrentNavigation()?.extras.state?.['user'];
    this.idUserHtmlRouterLink = this.activatedRoute.snapshot.params['id'];

    console.log(this.idUserHtmlRouterLink);
  }

  ngOnInit() {
  }

  backLogin() {
    this.route.navigate(['/login']);
  }

}
