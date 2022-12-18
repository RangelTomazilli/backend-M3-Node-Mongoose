import { Model } from "mongoose";
import { Review } from "../models/reviews.model";
import { fakeReviewData, updatedReview } from "./fake.review.data";

export const fakeReviewModel = {
  find: (param) => {
    if (param) {
      return Promise.resolve(fakeReviewData[0]);
    }
    return Promise.resolve(fakeReviewData);
  },
  findById: () => Promise.resolve(fakeReviewData[0]),
  create: () => Promise.resolve(fakeReviewData[0]),
  findByIdAndUpdate: () => Promise.resolve(updatedReview),
} as unknown as Model<Review>;
