import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransporterTokenCreateDTO } from 'src/dtos/transporter-token';
import { TransporterTokenDeleteByIdDTO } from 'src/dtos/transporter-token/transporter-token-delete-by-id.dto';
import {
  TransporterTokenCreateUseCase,
  TransporterTokenDeleteByIdUseCase,
} from 'src/use-cases/transporter-token';

import { AuthGuard } from 'src/utilities/guards';

@ApiTags('Transporter Token')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard())
export class TransporterTokenController {
  @Inject(TransporterTokenCreateUseCase)
  private readonly transporterTokenCreateUseCase: TransporterTokenCreateUseCase;
  @Inject(TransporterTokenDeleteByIdUseCase)
  private readonly transporterTokenDeleteByIdUseCase: TransporterTokenDeleteByIdUseCase;

  @Post()
  async Create(
    @Body() dto: TransporterTokenCreateDTO,
    @Req() request: Request,
  ) {
    return this.transporterTokenCreateUseCase.execute(dto, request);
  }

  @Delete(':id')
  async DeleteById(@Param() dto: TransporterTokenDeleteByIdDTO) {
    return this.transporterTokenDeleteByIdUseCase.execute(dto);
  }
}
