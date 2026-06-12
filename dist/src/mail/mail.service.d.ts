import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailer;
    constructor(mailer: MailerService);
    sendWelcome(email: string): Promise<void>;
}
