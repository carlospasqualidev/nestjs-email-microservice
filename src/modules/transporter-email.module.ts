import { Module } from '@nestjs/common';
import { TransporterEmailController } from 'src/controllers/transporter-email';
import { TransporterTokenRepository } from 'src/repositories/transporter-token';
import { TransporterEmailSendUseCase } from 'src/use-cases/transporter-email';

@Module({
  providers: [TransporterTokenRepository, TransporterEmailSendUseCase],
  controllers: [TransporterEmailController],
})
export class TransporterEmailModule {}
