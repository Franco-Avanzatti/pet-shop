import { PrismaService } from '../../prisma/prisma.service';
export declare class PaymentsService {
    private readonly prisma;
    private readonly payment;
    constructor(prisma: PrismaService);
    handleWebhook(body: Record<string, unknown>): Promise<{
        received: boolean;
    }>;
}
