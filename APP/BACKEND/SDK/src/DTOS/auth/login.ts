import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
  ValidationArguments,
} from 'class-validator';

export class LoginUser {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsString()
  @IsDefined()
  @MinLength(10, {
    message: (val: ValidationArguments): string => {
      return `password ${val.value} must be of min length 10`;
    },
  })
  password: string;
}
