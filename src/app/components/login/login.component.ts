import { Component, ViewChild} from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginResponse } from '../../response/user/login.response';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/Role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  phoneNumber:string= "0123336769";
  password:string = "123456";
  roles:Role[] = [];//Mảng
  rememberMe:boolean = true;
  selectedRole:Role | undefined; //Biến lưu giá trị

  constructor(
    private router:Router,
    private userService:UserService,
    private tokenService:TokenService,
    private roleService:RoleService
  ){
  }

  onPhoneNumberChange(){
    console.log("phone type: ",this.phoneNumber);
  }

  ngOnInit(){
    debugger
    this.roleService.getRoles().subscribe({
      next:(roles:Role[]) => {
          debugger
          this.roles = roles;
          this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error:(error:any) => {
        debugger
        console.error(`Error getting roles: ${error}`);
      } 
    });
  }

  login(){
    const message = 'phone_number: '+ this.phoneNumber +
    '\npassword: '+ this.password;
    alert(message);

    const loginDTO:LoginDTO = {
      phone_number:this.phoneNumber,
      password:this.password,
      role_id: this.selectedRole?.id ?? "a1cf19c0-53d8-4f9c-9e1c-e671219cee8f"
    };
    
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        const {token} = response;
        if(this.rememberMe){
          this.tokenService.setToken(token);
        }   
      },
      complete: () => {
          debugger;
      },error: ( error:any) =>{
        alert(`Đăng ký thất bại: ${error.error}`);
      }
    });
  }
}
