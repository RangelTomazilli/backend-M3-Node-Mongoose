import { Request } from "express";

export function invalidBodyNewReview(req: Request) {
  const updateStatus = {
    title: req.body.title,
    review: req.body.review,
    editDate: req.body.editDate,
    rate: req.body.rate,
  };

  const jsonBook = JSON.stringify(updateStatus);
  const jsonBody = JSON.stringify(req.body);

  if (jsonBook !== jsonBody) {
    return true;
  }

  return false;
}

export function invalidBodyEditReview(req: Request) {
  const updateStatus = {
    review: req.body.review,
    editDate: req.body.editDate,
  };

  const jsonBook = JSON.stringify(updateStatus);
  const jsonBody = JSON.stringify(req.body);

  if (jsonBook !== jsonBody) {
    return true;
  }

  return false;
}
