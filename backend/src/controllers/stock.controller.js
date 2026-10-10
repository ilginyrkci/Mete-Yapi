import { updateStock, getStockLogs, getLowStockItems } from "../services/stock.service.js";

export async function updateStockController(req, res) {
  const product = await updateStock(req.params.id, req.body.stock, req.user.id);
  res.json(product);
}

export async function getStockLogsController(req, res) {
  const logs = await getStockLogs(req.query.productId);
  res.json(logs);
}

export async function getLowStockController(req, res) {
  const items = await getLowStockItems(Number(req.query.threshold) || 10);
  res.json(items);
}
