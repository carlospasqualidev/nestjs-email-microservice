import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IFindOptions,
  ITransporterTokenRepository,
} from './transporter-token-repository.interface';
import { prisma } from 'src/utilities/database';
import { cryptography } from 'src/utilities/cryptography';
import { TransporterTokenEntity } from 'src/entities/transporter-token';
import { jwt } from 'src/utilities/jwt';

@Injectable()
export class TransporterTokenRepository implements ITransporterTokenRepository {
  //#region CREATE
  async create(data: TransporterTokenEntity): Promise<TransporterTokenEntity> {
    const email = JSON.stringify(await cryptography.encrypt(data.email));
    const password = JSON.stringify(await cryptography.encrypt(data.password));

    console.log(email, password);

    const transporterTokenData = await prisma.transporterToken.create({
      data: {
        ...data,
        email,
        password,
      },
    });

    const token = jwt.sign({ id: transporterTokenData.id }, '999d');
    const transporterToken = await prisma.transporterToken.update({
      data: {
        token,
      },
      where: {
        id: transporterTokenData.id,
      },
    });

    return transporterToken;
  }
  //#endregion

  //#region FIND
  async findCredentialsByToken(
    token: string,
    options: IFindOptions = { validate: true },
  ): Promise<{ email: string; password: string } | null> {
    const transporterToken = await prisma.transporterToken.findUnique({
      where: {
        token,
      },
    });

    if (options.validate && !transporterToken)
      throw new NotFoundException(
        'Transporter não encontrado na base de dados.',
      );

    const credentials = {
      password: await cryptography.decrypt(
        JSON.parse(transporterToken.password),
      ),
      email: await cryptography.decrypt(JSON.parse(transporterToken.email)),
    };

    return credentials;
  }

  async findManyByUserId(
    id: string,
  ): Promise<TransporterTokenEntity[] | undefined> {
    const transporterTokens = await prisma.transporterToken.findMany({
      where: {
        userId: id,
      },
    });

    return transporterTokens;
  }

  //#endregion

  //#region DELETE
  async delete(id: string) {
    await prisma.transporterToken.delete({
      where: {
        id,
      },
    });
  }
  //#endregion
}
