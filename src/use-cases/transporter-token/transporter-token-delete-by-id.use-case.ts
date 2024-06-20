import { Inject, Injectable } from '@nestjs/common';
import { UserDeleteByIdDTO } from 'src/dtos/user';
import { TransporterTokenRepository } from 'src/repositories/transporter-token';

@Injectable()
export class TransporterTokenDeleteByIdUseCase {
  @Inject(TransporterTokenRepository)
  private readonly transporterTokenRepository: TransporterTokenRepository;

  public async execute({ id }: UserDeleteByIdDTO) {
    return this.transporterTokenRepository.delete(id);
  }
}
