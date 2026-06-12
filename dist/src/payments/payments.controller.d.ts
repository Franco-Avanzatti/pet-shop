import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly service;
    constructor(service: PaymentsService);
    webhook(body: Record<string, unknown>): Promise<{
        received: boolean;
    }>;
}
