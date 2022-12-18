import { Request } from "express";

export function invalidBody(req: Request) {
  const book = {
    title: req.body.title,
    language: req.body.language,
    status: req.body.status,
    author: req.body.autor,
  };

  const jsonBook = JSON.stringify(book);
  const jsonBody = JSON.stringify(req.body);

  if (jsonBook !== jsonBody) {
    return true;
  }

  return false;
}
