/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inject, Injectable } from '@nestjs/common';

import { TransporterTokenRepository } from 'src/repositories/transporter-token';
import { TransporterEmailSendDTO } from 'src/dtos/transporter-email';
import { EmailTransporter } from 'src/utilities/email';

@Injectable()
export class TransporterEmailSendUseCase {
  @Inject(TransporterTokenRepository)
  private readonly transporterTokenRepository: TransporterTokenRepository;

  public async execute(dto: TransporterEmailSendDTO) {
    const { email, password } =
      await this.transporterTokenRepository.findCredentialsByToken(dto.token);

    const transporter = new EmailTransporter({ email, password });

    const errors = [];
    for (let i = 0; i < dto.emails.length; i++) {
      try {
        await transporter.sendMail(dto.emails[i]);
      } catch (error) {
        errors.push(error);
      }
    }
    return errors;
  }
}
