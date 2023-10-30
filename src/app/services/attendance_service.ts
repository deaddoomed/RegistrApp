import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendanceModel } from '../models/AttendanceModel';
import { Observable } from 'rxjs';


@Injectable({  providedIn: 'root'})
export class AttendanceService {

  constructor(private _httpclient: HttpClient) { 
  }

  URL_SUPABASE = "https://xkwajudfhpaawwqdzwok.supabase.co/rest/v1/"
  supabaseheaders = new HttpHeaders().set("apiKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd2FqdWRmaHBhYXd3cWR6d29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwMTY3MDYsImV4cCI6MjAwOTU5MjcwNn0.oCEoCYo8VQMjCKWlRXf4IcjE0haNuOe3mwjJnRvrFLE")

  generateAttendance(attendance: AttendanceModel): Observable<any>{
    return this._httpclient.post<any>(this.URL_SUPABASE+'Attendance',attendance,{headers: this.supabaseheaders});
  }

  registerAttendance(cod_class: number, id_user: number): Observable<any>{
    return this._httpclient.patch<any>(this.URL_SUPABASE+'Attendance?cod_subject=eq.'+cod_class+"&numrun=eq."+id_user, null,{headers: this.supabaseheaders});
  }

  getClasses(): Observable<any>{
    return this._httpclient.get<AttendanceModel[]>(this.URL_SUPABASE+"Lists", { headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
  }


}