export interface IEmailTransporterConstructor {
  email: string;
  password: string;
}

export interface ISendMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments?: {
    filename: string;
    path: string;
  }[];
}

export interface IEmailTransporter {
  sendMail: (options: ISendMailOptions) => Promise<any>;
}
