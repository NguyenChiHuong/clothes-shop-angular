import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { TokenService } from './token.service';

@Injectable({
providedIn: 'root'
})

export class RoleService {
    private apiGetRoles = `${environment.apiUrl}/role`; 

    constructor(private http: HttpClient){}
    
    getRoles(): Observable<any> {
        // const token = this.tokenService.getToken();
        // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any[]>(this.apiGetRoles);
    }
}