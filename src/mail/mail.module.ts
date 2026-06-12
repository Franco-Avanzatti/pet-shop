import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { env } from '../config/env.config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env.MAIL_HOST,
        port: 587,
        secure: false,

        auth: {
          user: env.MAIL_USER,
          pass: env.MAIL_PASS,
        },

        tls: {
          rejectUnauthorized: false,
        },
      },

      defaults: {
        from: `"Scooby-Doo Shop" <${env.MAIL_USER}>`,
      },
    }),
  ],

  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
