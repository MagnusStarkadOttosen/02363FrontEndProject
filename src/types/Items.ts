interface Item{
    id: String;
    name: String;
    price: number;
    currency: String;
    rebateQuantity: number;
    rebatePercent: number;
    upsellPruductId: String | null;
}