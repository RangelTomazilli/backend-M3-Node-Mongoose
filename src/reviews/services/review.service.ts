import { Review } from "../models/reviews.model";
import { ReviewRepository } from "../repositories/reviews.repository";
import {
  CustomErrors,
  invalidIdError,
  promiseError,
} from "../../utils/error.handler";
import { isIdValid } from "../../utils/id.validator";

export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async getAll(): Promise<Review[] | CustomErrors> {
    try {
      const reviews = await this.reviewRepository.getAll();
      return reviews;
    } catch (error) {
      return promiseError(error);
    }
  }

  async getById(id: string): Promise<Review | CustomErrors> {
    //Type.ObjectId.isValid() checa se o id é um ObjectId válido
    //ele retorna um boolean, dessa forma, tratamos erros de ID inválido
    if (!isIdValid(id)) {
      return invalidIdError(id);
    }

    try {
      const review = await this.reviewRepository.getById(id);
      return review;
    } catch (error) {
      return promiseError(error);
    }
  }

  async create(review: Review, bookId: string): Promise<Review | CustomErrors> {
    try {
      const formateedReview = { ...review, updateDate: [new Date()] };
      const newReview = await this.reviewRepository.create(formateedReview);
      return newReview;
    } catch (error) {
      return promiseError(error);
    }
  }

  async update(id: string, review: Review): Promise<Review | CustomErrors> {
    if (!isIdValid(id)) {
      return invalidIdError(id);
    }

    try {
      const updatedReview = await this.reviewRepository.update(id, review);
      return updatedReview;
    } catch (error) {
      return promiseError(error);
    }
  }
}
