import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dtos/user/login.dto';
import { RegisterDTO } from '../dtos/user/register.dto';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiUrl}/user/register`;
  private apiLogin =  `${environment.apiUrl}/user/login`;

  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi'  
    });
  }

  register(registerDTO: RegisterDTO): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(this.apiRegister, registerDTO, { headers });
  }

  login(loginDTO: LoginDTO): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(this.apiLogin, loginDTO, { headers });
  }
}
