import {IsString,IsNotEmpty,IsPhoneNumber,IsDate} from 'class-validator';
import { UUID } from 'crypto';
import { Role } from '../../models/Role';

export class LoginDTO{
  @IsPhoneNumber()
  phone_number:string;

  @IsString()
  @IsNotEmpty()
  password:string;

  role_id:UUID ;

  constructor(data:any){
    this.phone_number = data.phone_number;
    this.password = data.password;
    this.role_id = data.role_id;
  }


}
