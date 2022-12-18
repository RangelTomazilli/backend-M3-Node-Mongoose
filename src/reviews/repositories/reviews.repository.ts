import { Review } from "../models/reviews.model";
import { Model } from "mongoose";

export class ReviewRepository {
  constructor(private readonly reviewModel: Model<Review>) {}

  async getAll(): Promise<Review[]> {
    const reviews = await this.reviewModel.find();

    return reviews;
  }

  async getById(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id);

    if (review === null) {
      return {} as Review;
    }

    return review;
  }

  async create(review: Review): Promise<Review> {
    const newReview = this.reviewModel.create(review);
    return newReview;
  }

  async update(id: string, newReview: Review): Promise<Review> {
    const { review, editDate } = newReview;
    const previousReview = await this.reviewModel.findById(id);

    if (previousReview) {
      for (const review of previousReview.review) {
        if (review[0] === review) {
          throw new Error("This review already exist, try a new one.");
        }
      }
    }
    const updatedReview = await this.reviewModel.findByIdAndUpdate(
      id,
      {
        $push: {
          review,
          editDate: new Date(),
        },
      },
      {
        new: true,
      }
    );

    if (updatedReview === null) {
      return {} as Review;
    }

    return updatedReview;
  }
}
