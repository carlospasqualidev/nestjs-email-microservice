import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransporterEmailSendDTO } from 'src/dtos/transporter-email';
import { TransporterEmailSendUseCase } from 'src/use-cases/transporter-email/transporter-email-send.use-case';
import { FastifyReply } from 'fastify';

@ApiTags('Transporter Email')
@Controller()
export class TransporterEmailController {
  @Inject(TransporterEmailSendUseCase)
  private readonly transporterEmailSendUseCase: TransporterEmailSendUseCase;

  @Post()
  async Send(@Body() dto: TransporterEmailSendDTO, @Res() res: FastifyReply) {
    const errors = await this.transporterEmailSendUseCase.execute(dto);

    if (errors.length === dto.emails.length) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        successes: 0,
        failures: errors.length,
        errors,
      });
    }

    return res.status(HttpStatus.OK).send({
      successes: dto.emails.length - errors.length,
      failures: errors.length,
      errors,
    });
  }
}
