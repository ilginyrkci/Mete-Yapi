import { addReview, getProductReviews } from "../services/review.service.js";

export async function addReviewController(req, res) {
  const review = await addReview(req.user.id, req.params.id, req.body);
  res.status(201).json(review);
}

export async function getReviewsController(req, res) {
  const reviews = await getProductReviews(req.params.id);
  res.json(reviews);
}
