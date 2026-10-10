import { getDashboardStats } from "../services/dashboard.service.js";

export async function getDashboardController(req, res) {
  const stats = await getDashboardStats();
  res.json(stats);
}
