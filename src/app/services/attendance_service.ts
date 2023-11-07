import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendanceModel } from '../models/AttendanceModel';
import { Observable } from 'rxjs';
import { IAttendance } from '../models/IAttendance';

@Injectable({  providedIn: 'root'})
export class AttendanceService {

  constructor(private _httpclient: HttpClient) { 
  }

  URL_SUPABASE = 'https://durbxicxcabbrhwftadv.supabase.co/rest/v1/'
  supabaseheaders = new HttpHeaders().set('apikey','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cmJ4aWN4Y2FiYnJod2Z0YWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NzExOTksImV4cCI6MjAxMTA0NzE5OX0.NASHfj0II-9NVlMW7OBzBXdRYCfg6OwTsEloibW8pB0')

  generateAttendance(attendance: AttendanceModel): Observable<any>{
    return this._httpclient.post(this.URL_SUPABASE+'Attendance',attendance,{headers: this.supabaseheaders});
  }

  registerAttendance(id: number):Observable<any>{
    console.log("attendanceid :"+id);
    return this._httpclient.patch(this.URL_SUPABASE+'Attendance?id=eq.'+id, {"state": true} ,{headers: this.supabaseheaders,responseType: 'json'});
  }

  getClasses(): Observable<any>{
    return this._httpclient.get<any>(this.URL_SUPABASE+'Classes', { headers: this.supabaseheaders, responseType: 'json'});
  }

  getAttendance(cod_class: number, numrun: number): Observable<any> {
    const cosa = this._httpclient.get(this.URL_SUPABASE+'Attendance?cod_class=eq.'+cod_class+'&numrun=eq.'+numrun, { headers: this.supabaseheaders, responseType: 'json'});
    console.log(cosa);
    return cosa
  }

}