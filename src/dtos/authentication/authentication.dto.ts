import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationDTO {
  @IsString()
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @ApiProperty({
    example: 'admin@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatório.' })
  @ApiProperty({
    example: '123123123',
  })
  password: string;
}
