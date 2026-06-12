interface PreferenceItem {
    id: string;
    title: string;
    quantity: number;
    unit_price: number;
}
export declare class MercadoPagoService {
    private preference;
    constructor();
    createPreference(items: PreferenceItem[], orderId: string): Promise<{
        id: string | undefined;
        init_point: string | undefined;
        sandbox_init_point: string | undefined;
    }>;
}
export {};
