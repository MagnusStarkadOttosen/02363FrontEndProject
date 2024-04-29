export interface Item{
    id: string;
    name: string;
    price: number;
    currency: string;
    type: string;
    offer: string;
    quantity: number;
    gift: boolean;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string
    imageUrl: string;
    substituteItem: Item | null;
}