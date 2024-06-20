import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { RouterModule } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
// import { UserPermissionModule } from './user-permission.module';
import { TransporterTokenModule } from './transporter-token.module';
import { TransporterEmailModule } from './transporter-email.module';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    // UserPermissionModule,
    TransporterTokenModule,
    TransporterEmailModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthenticationModule,
      },
    ]),
    RouterModule.register([
      {
        path: 'users',
        module: UserModule,
      },
    ]),
    // RouterModule.register([
    //   {
    //     path: 'users-permissions',
    //     module: UserPermissionModule,
    //   },
    // ]),

    RouterModule.register([
      {
        path: 'transporter-tokens',
        module: TransporterTokenModule,
      },
    ]),
    RouterModule.register([
      {
        path: 'transporter-emails',
        module: TransporterEmailModule,
      },
    ]),
  ],
})
export class AppModule {}
