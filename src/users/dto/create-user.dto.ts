import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'abcd@gmail.com', description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth of the user',
  })
  dob: Date;

  @ApiProperty({ example: '12345678', description: 'Password of the user' })
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
