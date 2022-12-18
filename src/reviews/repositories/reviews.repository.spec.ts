import {
  fakeReviewData,
  updatedReview,
  fakeId,
} from "./../__mocks__/fake.review.data";
import { fakeReviewModel } from "../__mocks__/fake.review.model";
import { ReviewRepository } from "./reviews.repository";
import { jest } from "@jest/globals";

const reviewRepository = new ReviewRepository(fakeReviewModel);

describe("ReviewRepository", () => {
  describe("getAll", () => {
    it("should return a list of reviews", async () => {
      const reviews = await reviewRepository.getAll();
      expect(reviews).toEqual(fakeReviewData);
    });
    it("should return an empty array", async () => {
      //o spyOn entra no fakeReviewModel e substitui o find por uma função de
      //retorno vazio
      jest.spyOn(fakeReviewModel, "find").mockResolvedValueOnce([]);

      const reviews = await reviewRepository.getAll();
      expect(reviews).toEqual([]);
    });
  });
  describe("getById", () => {
    it("should return a review", async () => {
      const review = await reviewRepository.getById(fakeId);
      expect(review).toEqual(fakeReviewData[0]);
    });
    it("should return an empty object", async () => {
      jest.spyOn(fakeReviewModel, "findById").mockResolvedValueOnce(null);

      const review = await reviewRepository.getById(fakeId);
      expect(review).toEqual({});
    });
  });
  describe("create", () => {
    it("should create a review", async () => {
      const newReview = await reviewRepository.create(fakeReviewData[0]);
      expect(newReview).toEqual(fakeReviewData[0]);
    });
  });
  describe("update", () => {
    it("should update a review", async () => {
      const review = await reviewRepository.update(fakeId, fakeReviewData[0]);
      expect(review).toEqual(updatedReview);
    });
    it("should return an error, This review already exist, try a new one.", async () => {
      jest
        .spyOn(fakeReviewModel, "findById")
        .mockResolvedValueOnce(fakeReviewData[0]);
      jest
        .spyOn(fakeReviewModel, "findByIdAndUpdate")
        .mockResolvedValueOnce(fakeReviewData[0]);
      const book = await reviewRepository.update(fakeId, fakeReviewData[1]);
      expect(book).toEqual(fakeReviewData[0]);
    });
    it("should return an empty object", async () => {
      jest
        .spyOn(fakeReviewModel, "findByIdAndUpdate")
        .mockResolvedValueOnce(null);

      const review = await reviewRepository.update(fakeId, fakeReviewData[0]);
      expect(review).toEqual({});
    });
  });
});
