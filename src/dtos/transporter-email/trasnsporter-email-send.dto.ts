import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AttachmentDTO {
  @IsString({ message: 'filename deve ser uma string.' })
  @IsNotEmpty({ message: 'filename é obrigatório.' })
  filename: string;

  @IsString({ message: 'path deve ser uma string.' })
  @IsNotEmpty({ message: 'path é obrigatório.' })
  path: string;
}

export class SendMailOptionsDTO {
  @IsString({ message: 'from deve ser uma string.' })
  @IsNotEmpty({ message: 'from é obrigatório.' })
  from: string;

  @IsString({ message: 'to deve ser uma string.' })
  @IsNotEmpty({ message: 'to é obrigatório.' })
  @IsEmail({}, { message: 'to deve ser um e-mail válido.' })
  to: string;

  @IsString({ message: 'subject deve ser uma string.' })
  @IsNotEmpty({ message: 'subject é obrigatório.' })
  subject: string;

  @IsString({ message: 'html deve ser uma string.' })
  @IsNotEmpty({ message: 'html é obrigatório.' })
  html: string;

  @IsOptional()
  @IsArray({ message: 'Os anexos devem ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => AttachmentDTO)
  attachments?: AttachmentDTO[];
}

export class TransporterEmailSendDTO {
  @IsString({
    message: 'token deve ser uma string.',
  })
  @IsNotEmpty({ message: 'token é obrigatório.' })
  token: string;

  @IsArray({ message: 'As opções de envio de e-mail devem ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => SendMailOptionsDTO)
  emails: SendMailOptionsDTO[];
}
