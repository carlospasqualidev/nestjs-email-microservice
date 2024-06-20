export class TransporterTokenEntity {
  id?: string;
  userId: string;
  name: string;
  token: string;
  password: string;
  email: string;

  constructor(data: TransporterTokenEntity) {
    Object.assign(this, data);
  }
}
