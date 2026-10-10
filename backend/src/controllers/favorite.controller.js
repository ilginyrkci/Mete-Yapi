import { toggleFavorite, listFavorites } from "../services/favorite.service.js";

export async function toggleFavoriteController(req, res) {
  const result = await toggleFavorite(req.user.id, req.body.productId);
  res.json(result);
}

export async function getFavoritesController(req, res) {
  const favorites = await listFavorites(req.user.id);
  res.json(favorites);
}
