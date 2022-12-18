import { it, describe, expect } from "@jest/globals";
import { mockRequest } from "../__mocks__/fake.review.routes";
import {
  invalidBodyNewReview,
  invalidBodyEditReview,
} from "./review.body.validator";

const req = mockRequest();

const invalidBodyNewReviewTeste = {
  title: "consectetur adipis eiusmod tempor incididunt",
  review: [
    "Lorem ipsum dolor sit amet, consectetur adipis eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  ],
  editDate: [new Date()],
  rate: 3,
  anything: "date",
};
const isvalidBodyNewReviewTeste = {
  review: [
    "Lorem ipsum dolor sit amet, consectetur adipis eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  ],
  editDate: [new Date()],
};

describe("invalidBodyNewReview", () => {
  it("should return true if body is invalid", () => {
    req.body = invalidBodyNewReviewTeste;
    const bodyNewReview = invalidBodyNewReview(req);
    expect(bodyNewReview).toEqual(true);
  });
  it("should return false if body is valid", () => {
    req.body = isvalidBodyNewReviewTeste;
    const bodyNewReview = invalidBodyNewReview(req);
    expect(bodyNewReview).toEqual(false);
  });
});

const invalidBodyEditReviewTeste = {
  title: "review Harry Potter e a Pedra Filosofal",
  review: [
    "Lorem ipsum dolor sit amet, consectetur adipis eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  ],
  editDate: [new Date()],
  rate: 3,
};
const isvalidBodyEditReviewTeste = {
  review: [
    "Lorem ipsum dolor sit amet, consectetur adipis eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  ],
  editDate: [new Date()],
};

describe("invalidBodyEditReview", () => {
  it("should return true if body is invalid", () => {
    req.body = invalidBodyEditReviewTeste;
    const bodyEditReview = invalidBodyEditReview(req);
    expect(bodyEditReview).toEqual(true);
  });
  it("should return false if body is valid", () => {
    req.body = isvalidBodyEditReviewTeste;
    const bodyEditReview = invalidBodyEditReview(req);
    expect(bodyEditReview).toEqual(false);
  });
});
