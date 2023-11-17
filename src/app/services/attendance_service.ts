import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendanceModel } from '../models/AttendanceModel';
import { Observable, map } from 'rxjs';

@Injectable({  providedIn: 'root'})
export class AttendanceService {

  constructor(private _httpclient: HttpClient) { 
  }

  URL_SUPABASE = 'https://durbxicxcabbrhwftadv.supabase.co/rest/v1/'
  supabaseheaders = new HttpHeaders().set('apikey','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cmJ4aWN4Y2FiYnJod2Z0YWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NzExOTksImV4cCI6MjAxMTA0NzE5OX0.NASHfj0II-9NVlMW7OBzBXdRYCfg6OwTsEloibW8pB0')

  //ATTENDANCE MODULE
  getAttendance(cod_class: number, numrun: number): Observable<any> {
    return this._httpclient.get(this.URL_SUPABASE+'Attendance?cod_class=eq.'+cod_class+'&numrun=eq.'+numrun, { headers: this.supabaseheaders, responseType: 'json'});
  }

  generateAttendance(attendance: AttendanceModel): Observable<any>{
    return this._httpclient.post(this.URL_SUPABASE+'Attendance',attendance,{headers: this.supabaseheaders});
  }

  registerAttendance(id: number):Observable<any>{
    return this._httpclient.patch(this.URL_SUPABASE+'Attendance?id=eq.'+id, {"state": true} ,{headers: this.supabaseheaders,responseType: 'json'});
  }

  //CLASSES MODULE
  getClasses(numrun: number): Observable<any>{
    return this._httpclient.get<any>(this.URL_SUPABASE+'Class?numrun=eq.'+numrun, { headers: this.supabaseheaders, responseType: 'json'});
  }
  
  getClassCodes(cod_subject: number): Observable<any> {
    return this._httpclient.get(this.URL_SUPABASE+'Class?cod_subject=eq.'+cod_subject, { headers: this.supabaseheaders, responseType: 'json'});
  }
  
  // SUBJECTS MODULE
  getSubjects(numrun: number): Observable<any> {
    return this._httpclient.get(this.URL_SUPABASE+'Lists?numrun=eq.'+numrun, { headers: this.supabaseheaders, responseType: 'json'});
  }

  getSubjectInfo(cod_subject: number): Observable<any>{
    return this._httpclient.get(this.URL_SUPABASE+'Subject?cod_subject=eq.'+cod_subject, { headers: this.supabaseheaders, responseType: 'json'});
  }

  getSubjectId(cod_class: number) {
      return this._httpclient.get(this.URL_SUPABASE+'Class?cod_class=eq.'+cod_class, { headers: this.supabaseheaders}).pipe(
      map((clase:any) => {
        return clase[0].cod_subject;
      }))
  }

  getSubjectName(cod_subject: number){
    return this._httpclient.get(this.URL_SUPABASE+'Subject?cod_subject=eq.'+cod_subject, { headers: this.supabaseheaders}).pipe(
      map((subject:any) => {
        return subject[0].subject_name;
      })
    );
  }

  //LIST MODULE
  getList(cod_subject: number){
    return this._httpclient.get(this.URL_SUPABASE+'Lists?cod_subject=eq.'+cod_subject, { headers: this.supabaseheaders});
  }


}