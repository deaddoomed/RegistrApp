import { Injectable } from "@angular/core";
import { UserModel } from "../models/UserModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { IUserLogin } from "../models/IUserLogin";


@Injectable({ providedIn: 'root' })
export class UserService {

    URL_SUPABASE = 'https://durbxicxcabbrhwftadv.supabase.co/rest/v1/'


    constructor(private _httpclient: HttpClient) {
    }

    supabaseheaders = new HttpHeaders().set('apikey','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cmJ4aWN4Y2FiYnJod2Z0YWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NzExOTksImV4cCI6MjAxMTA0NzE5OX0.NASHfj0II-9NVlMW7OBzBXdRYCfg6OwTsEloibW8pB0')

    getUserList(): Observable<UserModel[]> {
        return this._httpclient.get<UserModel[]>(this.URL_SUPABASE, { headers: this.supabaseheaders, responseType: 'json' });
    }

    getUser(email: string): Observable<UserModel> {
        return this._httpclient.get<UserModel>(this.URL_SUPABASE+'Users?email=eq.'+ email, { headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }

    getLoginUser(iUserLogin: IUserLogin): Observable<string | any> {
        return this._httpclient.get<any>(this.URL_SUPABASE + "Users?username=eq." + iUserLogin.username + "&password=eq." + iUserLogin.password, { headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' });
    }

    getUserType(user_id: string){
        return this._httpclient.get<any>(this.URL_SUPABASE+"users_type?username=eq."+user_id+"&select=id,created_at,user(*),type(*)", { headers: this.supabaseheaders})
    }

}