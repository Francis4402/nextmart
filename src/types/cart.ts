export interface IOrder {
  products: IOrderProduct[];
  coupon?: string;
  shippingAddress: string;
  paymentMethod: string;
  shopId: string;
}

export interface IOrderProduct {
  product: string;
  quantity: number;
  color: string;
}