import { mockResponse, mockRequest } from "../__mocks__/fake.review.routes";
import { fakeReviewService } from "../__mocks__/fake.review.service";
import { ReviewController } from "./review.controller";
import {
  fakeId,
  fakeReviewData,
  fakeReviewsInvalidBody,
} from "../__mocks__/fake.review.data";
import { StatusCode } from "../../utils/status.code";
import { invalidIdError, promiseError } from "../../utils/error.handler";

const reviewController = new ReviewController(fakeReviewService);
const req = mockRequest();
const res = mockResponse();

describe("ReviewController", () => {
  describe("getAll", () => {
    it("should return all reviews", async () => {
      await reviewController.getAll(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeReviewData);
    });
    it("should return status code 200", async () => {
      await reviewController.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
    it("should return a promiseError", async () => {
      jest
        .spyOn(fakeReviewService, "getAll")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await reviewController.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
  });

  describe("getById", () => {
    it("should return a review", async () => {
      req.params.id = fakeId;
      await reviewController.getById(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeReviewData[0]);
    });
    it("should return status code 200", async () => {
      req.params.id = fakeId;
      await reviewController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
    it("should return a promiseError", async () => {
      req.params.id = fakeId;
      jest
        .spyOn(fakeReviewService, "getById")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await reviewController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
    it("should return a invalidIdError", async () => {
      jest
        .spyOn(fakeReviewService, "getById")
        .mockImplementation(() => Promise.resolve(invalidIdError("id")));
      await reviewController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
    });
  });

  describe("create", () => {
    it("should create a review", async () => {
      req.body = fakeReviewData[1];
      await reviewController.create(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeReviewData[1]);
    });
    it("should return status code 201", async () => {
      req.body = fakeReviewData[1];
      await reviewController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.CREATED);
    });
    it("should return a promiseError", async () => {
      req.body = fakeReviewData[1];
      jest
        .spyOn(fakeReviewService, "create")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await reviewController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
  });

  describe("update", () => {
    it("should update a review", async () => {
      req.params.id = fakeId;
      req.body = fakeReviewData[1];
      await reviewController.update(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeReviewData[1]);
    });
    it("should return status code 400", async () => {
      req.body = fakeReviewsInvalidBody;
      await reviewController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
    });
    it("should return status code 200", async () => {
      req.params.id = fakeId;
      req.body = fakeReviewData[1];
      await reviewController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
    it("should return a promiseError", async () => {
      req.params.id = fakeId;
      req.body = fakeReviewData[1];
      jest
        .spyOn(fakeReviewService, "update")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await reviewController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
    it("should return a invalidIdError", async () => {
      req.params.id = fakeId;
      req.body = fakeReviewData[1];
      jest
        .spyOn(fakeReviewService, "update")
        .mockImplementation(() => Promise.resolve(invalidIdError("id")));

      await reviewController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
    });
  });
});
