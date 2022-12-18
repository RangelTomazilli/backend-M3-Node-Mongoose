import { BookService } from "./../services/book.service";
import { BookRepository } from "./../repositories/book.repository";
import { BookModel } from "../models/book.model";
import { BookController } from "../controllers/book.controller";

export function bookFactory() {
  const booksRepository = new BookRepository(BookModel);
  const booksService = new BookService(booksRepository);
  const booksController = new BookController(booksService);

  return booksController;
}

export const book = bookFactory();
