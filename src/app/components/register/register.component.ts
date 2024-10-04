import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;

  phoneNumber:string;
  password:string;
  retypePassword:string;
  fullName:string;
  dateOfBirth:Date;
  address:string;
  isAccepted:boolean;

  constructor(private router:Router,private userService:UserService){
    this.phoneNumber = "";
    this.password = "";
    this.retypePassword = "";
    this.fullName = "";
    this.dateOfBirth = new Date();
    this.address = "";
    this.isAccepted = false;
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneNumberChange(){
    console.log("phone type: ",this.phoneNumber);
  }

  register(){
    const message = 'phone: '+ this.phoneNumber +
    '\npassword: '+ this.password +
    '\nretypePassword: '+ this.retypePassword +
    '\nfullname: '+ this.fullName +
    '\ndateOfBirth: '+ this.dateOfBirth +
    '\naddress: '+ this.address +
    '\naccepted: '+ this.isAccepted;
    alert(message);

    const registerDTO:RegisterDTO = {
      "fullName":this.fullName,
      "password":this.password,
      "retypePassword":this.retypePassword,
      "phone":this.phoneNumber,
      "dateOfBirth":this.dateOfBirth,
      "address":this.address,
      "facebookAccountId":0,
      "googleAccountId":0,
      "roleId":"a1cf19c0-53d8-4f9c-9e1c-e671219cee8f"
    }
    
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        this.router.navigate(['/login']);
      },
      complete: () => {
          debugger
      },error: ( error:any) =>{
        console.error('Chi tiết lỗi:', error); // Kiểm tra phản hồi từ server
        alert(`Đăng ký thất bại: ${error.message}`);
      }
    });
  }

  checkPasswordsMatch(){
    if(this.password !== this.retypePassword){
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMismatch':true});
    }else{
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  checkAge(){
    if(this.dateOfBirth){
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())){
        age--;
      }

      if(age < 18){
        this.registerForm.form.controls['dateOfBirth'].setErrors({'invalidAge':true});
      }else{
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}
