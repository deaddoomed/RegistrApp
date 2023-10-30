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

  registerAttendance(id: number):void{
    console.log(id);
    this._httpclient.patch(this.URL_SUPABASE+'Attendance?id=eq.'+id, {"state": true} ,{headers: this.supabaseheaders});
  }

  getClasses(): Observable<ListsModel[]>{
    return this._httpclient.get<ListsModel[]>(this.URL_SUPABASE, { headers: this.supabaseheaders});
  }

  getAttendance(class_id: number): Observable<any> {
    return this._httpclient.get<any>(this.URL_SUPABASE+'Attendance?cod_class=eq.'+class_id, { headers: this.supabaseheaders});
  }

}