import { TransporterTokenEntity } from 'src/entities/transporter-token';

export interface IFindOptions {
  validate: boolean;
}

export interface ITransporterTokenRepository {
  create(user: TransporterTokenEntity): Promise<TransporterTokenEntity>;
  findCredentialsByToken(
    id: string,
    options?: IFindOptions,
  ): Promise<{ email: string; password: string } | null>;

  findManyByUserId(
    id: string,
    options?: IFindOptions,
  ): Promise<TransporterTokenEntity[] | null>;
}
