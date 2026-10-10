import { createOrder, getUserOrders, updateOrderStatus } from "../services/order.service.js";

export async function createOrderController(req, res) {
  const order = await createOrder(req.user.id, req.body.items);
  res.status(201).json(order);
}

export async function getOrdersController(req, res) {
  const orders = await getUserOrders(req.user.id, req.user.role);
  res.json(orders);
}

export async function updateOrderStatusController(req, res) {
  const order = await updateOrderStatus(req.params.id, req.body.status);
  res.json(order);
}
