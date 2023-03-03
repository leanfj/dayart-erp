import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginInputDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
