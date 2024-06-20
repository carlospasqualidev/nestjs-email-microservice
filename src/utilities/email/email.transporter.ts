import { createTransport, Transporter } from 'nodemailer';
import {
  IEmailTransporterConstructor,
  IEmailTransporter,
  ISendMailOptions,
} from './email.transporter.interface';

export class EmailTransporter implements IEmailTransporter {
  private transporter: Transporter;
  private email: string;
  constructor({ email, password }: IEmailTransporterConstructor) {
    this.transporter = createTransport({
      host: 'smtp.mail.us-west-2.awsapps.com',
      port: 465,
      secure: true,
      auth: {
        user: email,
        pass: password,
      },
      tls: { rejectUnauthorized: false },
    });

    this.email = email;
  }

  async sendMail(options: ISendMailOptions): Promise<any> {
    options.from = `${options.from} <${this.email}>`;
    return this.transporter.sendMail(options);
  }
}
