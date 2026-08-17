import wpOrders from "@/data/wp-orders.json";
import type { OrderDataSource } from "@/data-access/contracts/order-data-source.interface";
import type { OrderRecord } from "@/interfaces/order.interface";

const orders = wpOrders.orders as OrderRecord[];
const orderById = new Map(orders.map((order) => [order._id, order]));
const orderByNumber = new Map(orders.map((order) => [order.orderNumber, order]));
const ordersByCreatedAtDesc = [...orders].sort((a, b) =>
  b.createdAt.localeCompare(a.createdAt),
);

export const jsonOrderDataSource: OrderDataSource = {
  async getById(id) {
    return orderById.get(id) ?? null;
  },
  async getByOrderNumber(orderNumber) {
    return orderByNumber.get(orderNumber) ?? null;
  },
  async getByStatus(status) {
    return ordersByCreatedAtDesc.filter((order) => order.status === status);
  },
  async getRecent(limit = 20) {
    return ordersByCreatedAtDesc.slice(0, Math.max(0, limit));
  },
};
