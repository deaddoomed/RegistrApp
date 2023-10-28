import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendanceModel } from '../models/AttendanceModel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private _http: HttpClient) { }

  superbaseUrl = "https://xkwajudfhpaawwqdzwok.supabase.co/rest/v1/"
  supabaseHeaders = new HttpHeaders().set("apiKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd2FqdWRmaHBhYXd3cWR6d29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwMTY3MDYsImV4cCI6MjAwOTU5MjcwNn0.oCEoCYo8VQMjCKWlRXf4IcjE0haNuOe3mwjJnRvrFLE")

  generateAttendance(attendance: AttendanceModel): Observable<any>{
    return this._http.post<any>(this.superbaseUrl+'Attendance',attendance,{headers: this.supabaseHeaders});
  }

  registerAttendance(cod_subject: number, date: Date, id_user: number): Observable<any>{
    return this._http.patch<any>(this.superbaseUrl+'Attendance?cod_subject=eq.'+cod_subject+"&numrun=eq."+id_user+"&date=eq."+date, ,{headers: this.supabaseHeaders});
  }


}