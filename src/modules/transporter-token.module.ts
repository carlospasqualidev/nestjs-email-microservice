import { Module } from '@nestjs/common';
import { TransporterTokenController } from 'src/controllers/transporter-token';
import { TransporterTokenRepository } from 'src/repositories/transporter-token';
import {
  TransporterTokenCreateUseCase,
  TransporterTokenDeleteByIdUseCase,
} from 'src/use-cases/transporter-token';

@Module({
  providers: [
    TransporterTokenRepository,
    TransporterTokenCreateUseCase,
    TransporterTokenDeleteByIdUseCase,
  ],
  controllers: [TransporterTokenController],
})
export class TransporterTokenModule {}
