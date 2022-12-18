import { ReviewService } from "./../services/review.service";
import { ReviewRepository } from "../repositories/reviews.repository";
import { ReviewModel } from "../models/reviews.model";
import { ReviewController } from "../controllers/review.controller";

export function reviewFactory() {
  const reviewsRepository = new ReviewRepository(ReviewModel);
  const reviewsService = new ReviewService(reviewsRepository);
  const reviewsController = new ReviewController(reviewsService);

  return reviewsController;
}

export const review = reviewFactory();
