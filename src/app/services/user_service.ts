import { Injectable } from "@angular/core";
import { UserModel } from "../models/UserModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError } from "rxjs";
import { IUserLogin } from "../models/IUserLogin";


@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private _httpclient: HttpClient) {
    }

    URL_SUPABASE = 'https://durbxicxcabbrhwftadv.supabase.co/rest/v1/'
    supabaseheaders = new HttpHeaders().set('apikey','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cmJ4aWN4Y2FiYnJod2Z0YWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NzExOTksImV4cCI6MjAxMTA0NzE5OX0.NASHfj0II-9NVlMW7OBzBXdRYCfg6OwTsEloibW8pB0')

    getUser(id: number): Observable<UserModel> {
        return this._httpclient.get<UserModel>(this.URL_SUPABASE+'Users?numrun=eq.'+ id, { headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }

    getLoginId(iUserLogin: IUserLogin): Observable<number | any> {
        return this._httpclient.get<any>(this.URL_SUPABASE + "Users?email=eq." + iUserLogin.email + "&password=eq." + iUserLogin.password, { headers: this.supabaseheaders }).pipe(
            map((user) => {
                return user[0].numrun;}), 
            catchError((err) => {
                console.log(err)
                return err;})
        )
    }

    getUserType(user_id: number){
        return this._httpclient.get<any>(this.URL_SUPABASE+"Users?numrun=eq."+user_id, { headers: this.supabaseheaders}).pipe(
            map((user) => {
                return user[0].id_type;}), 
            catchError((err) => {
                console.log(err)
                return err;})
        )
    }
}