import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AttendanceModel } from '../models/AttendanceModel';
import { ListsModel } from '../models/ListsModel';
import { Observable} from 'rxjs';


@Injectable({  providedIn: 'root'})
export class AttendanceService {

  constructor(private _httpclient: HttpClient) { 
  }

  URL_SUPABASE = 'https://durbxicxcabbrhwftadv.supabase.co/rest/v1/'
  supabaseheaders = new HttpHeaders().set('apikey','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cmJ4aWN4Y2FiYnJod2Z0YWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NzExOTksImV4cCI6MjAxMTA0NzE5OX0.NASHfj0II-9NVlMW7OBzBXdRYCfg6OwTsEloibW8pB0')

  generateAttendance(attendance: AttendanceModel): Observable<any>{
    return this._httpclient.post<any>(this.URL_SUPABASE+'Attendance',attendance,{headers: this.supabaseheaders});
  }

  registerAttendance(date: string, cod_class: number, id_user: number): Observable<any>{
    return this._httpclient.patch<any>(this.URL_SUPABASE+'Attendance?date=eq.'+date+'&cod_subject=eq.'+cod_class+'&numrun=eq.'+id_user, {"state": true} ,{headers: this.supabaseheaders});
  }

  getClasses(): Observable<ListsModel[]>{
    return this._httpclient.get<ListsModel[]>(this.URL_SUPABASE, { headers: this.supabaseheaders});
  }

}