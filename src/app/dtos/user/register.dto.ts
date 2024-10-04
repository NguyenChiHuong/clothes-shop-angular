import { UUID } from "crypto";
import {IsString,IsNotEmpty,IsPhoneNumber,IsDate} from 'class-validator';

export class RegisterDTO{
  @IsPhoneNumber()
  phone:string;

  @IsString()
  @IsNotEmpty()
  password:string;

  @IsString()
  @IsNotEmpty()
  retypePassword:string;

  @IsString()
  fullName:string;

  @IsDate()
  dateOfBirth:Date;

  @IsString()
  @IsNotEmpty()
  address:string;
  
  facebookAccountId:number;
  googleAccountId:number;
  roleId:UUID;

  constructor(data:any){
    this.phone = data.phone;
    this.password = data.password;
    this.retypePassword = data.retypePassword;
    this.fullName = data.fullName;
    this.dateOfBirth = data.dateOfBirth;
    this.address = data.address;
    this.facebookAccountId = data.facebookAccountId || 0;
    this.googleAccountId = data.googleAccountId || 0;
    this.roleId = data.roleId || "a1cf19c0-53d8-4f9c-9e1c-e671219cee8f";
  }
}