import {
  fakeReviewData,
  updatedReview,
  fakeId,
} from "./../__mocks__/fake.review.data";
import { fakeReviewRepository } from "../__mocks__/fake.review.repository";
import { ReviewService } from "./review.service";
import { jest, describe, it, expect } from "@jest/globals";
import { invalidIdError } from "../../utils/error.handler";

const reviewService = new ReviewService(fakeReviewRepository);

describe("ReviewService", () => {
  describe("getAll", () => {
    it("should call Repository.getAll", async () => {
      //criamos um spy que observa o fakeReviewRepository
      const spy = jest.spyOn(fakeReviewRepository, "getAll");

      //chamamos o método getAll do service
      await reviewService.getAll();

      //verificamos se o método foi chamado
      expect(spy).toHaveBeenCalled();
    });
    it("should return a list of reviews", async () => {
      const reviews = await reviewService.getAll();
      expect(reviews).toEqual(fakeReviewData);
    });
    it("should return an promiseError", async () => {
      //simulando uma situação de erro
      jest.spyOn(fakeReviewRepository, "getAll").mockRejectedValueOnce("Error");

      //atribui esse erro a uma consntante
      const error = await reviewService.getAll();

      //verifica se o erro foi tratado de devida forma
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
  });

  describe("getById", () => {
    it("should call Repository.getById", async () => {
      const spy = jest.spyOn(fakeReviewRepository, "getById");
      await reviewService.getById(fakeId);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a review", async () => {
      const review = await reviewService.getById(fakeId);
      expect(review).toEqual(fakeReviewData[0]);
    });
    it("should return an promiseError", async () => {
      jest
        .spyOn(fakeReviewRepository, "getById")
        .mockRejectedValueOnce("Error");
      const error = await reviewService.getById(fakeId);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
    it("should return a invalidIdError", async () => {
      const error = await reviewService.getById("invalidId");
      expect(error).toEqual(invalidIdError("invalidId"));
    });
  });

  describe("create", () => {
    it("should call Repository.create", async () => {
      const spy = jest.spyOn(fakeReviewRepository, "create");
      await reviewService.create(fakeReviewData[0]);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a review", async () => {
      const review = await reviewService.create(fakeReviewData[1]);
      expect(review).toEqual(fakeReviewData[1]);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeReviewRepository, "create").mockRejectedValueOnce("Error");
      const error = await reviewService.create(fakeReviewData[1]);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
  });

  describe("update", () => {
    it("should call Repository.update", async () => {
      const spy = jest.spyOn(fakeReviewRepository, "update");
      await reviewService.update(fakeId, updatedReview);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a review", async () => {
      const review = await reviewService.update(fakeId, updatedReview);
      expect(review).toEqual(updatedReview);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeReviewRepository, "update").mockRejectedValueOnce("Error");
      const error = await reviewService.update(fakeId, updatedReview);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });

    it("should return a invalidIdError", async () => {
      const error = await reviewService.update("invalidId", updatedReview);
      expect(error).toEqual(invalidIdError("invalidId"));
    });
  });
});
