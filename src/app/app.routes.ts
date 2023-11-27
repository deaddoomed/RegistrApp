import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'alumno',
    loadComponent: () => import('./alumno/alumno.page').then( m => m.AlumnoPage)
  },
  {
    path: 'docente',
    loadComponent: () => import('./docente/docente.page').then( m => m.DocentePage)
  },
  {
    path: 'attendance',
    loadComponent: () => import('./attendance/attendance.page').then( m => m.AttendancePage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'userinfo',
    loadComponent: () => import('./userinfo/userinfo.page').then( m => m.UserinfoPage)
  },
  {
    path: 'attendancecode',
    loadComponent: () => import('./attendancecode/attendancecode.page').then( m => m.AttendanceCodePage)
  },  {
    path: 'attendanceread',
    loadComponent: () => import('./attendanceread/attendanceread.page').then( m => m.AttendancereadPage)
  },




];
