export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export interface OrderItem {
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderRecord {
  _id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderData {
  orders: OrderRecord[];
}
