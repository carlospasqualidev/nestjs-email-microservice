/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Inject, Injectable, Request } from '@nestjs/common';

import { TransporterTokenRepository } from 'src/repositories/transporter-token';
import { TransporterTokenEntity } from 'src/entities/transporter-token';
import { TransporterTokenCreateDTO } from 'src/dtos/transporter-token/trasnsporter-token-create.dto';

@Injectable()
export class TransporterTokenCreateUseCase {
  @Inject(TransporterTokenRepository)
  private readonly transporterTokenRepository: TransporterTokenRepository;

  public async execute(dto: TransporterTokenCreateDTO, request: Request) {
    // @ts-ignore
    const userId = request.userId;
    const user = new TransporterTokenEntity({
      ...dto,
      token: '',
      userId,
    });

    return this.transporterTokenRepository.create(user);
  }
}
