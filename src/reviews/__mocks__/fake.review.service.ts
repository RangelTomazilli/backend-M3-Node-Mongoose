import { ReviewService } from "../services/review.service";
import { fakeReviewData } from "./fake.review.data";

export const fakeReviewService = {
  getAll: () => Promise.resolve(fakeReviewData),
  getById: () => Promise.resolve(fakeReviewData[0]),
  getByAuthor: () => Promise.resolve(fakeReviewData[0]),
  create: () => Promise.resolve(fakeReviewData[1]),
  update: () => Promise.resolve(fakeReviewData[0]),
} as unknown as ReviewService;
