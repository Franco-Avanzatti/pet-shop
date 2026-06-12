import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  async sendWelcome(email: string): Promise<void> {
    await this.mailer.sendMail({
      to: email,
      subject: '¡Bienvenido a Scooby-Doo Shop!',
      html: `
        <h2>¡Hola!</h2>
        <p>Gracias por registrarte en <strong>Scooby-Doo Shop</strong>.</p>
        <p>Ya podés empezar a comprar los mejores productos para tu mascota.</p>
      `,
    });
  }
}
