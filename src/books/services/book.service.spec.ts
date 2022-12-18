import {
  fakeBookData,
  updatedBook,
  fakeId,
} from "./../__mocks__/fake.book.data";
import { fakeBookRepository } from "../__mocks__/fake.book.repository";
import { BookService } from "./book.service";
import { jest, describe, it, expect } from "@jest/globals";
import { invalidIdError } from "../../utils/error.handler";

const bookService = new BookService(fakeBookRepository);

describe("BookService", () => {
  describe("getAll", () => {
    it("should call Repository.getAll", async () => {
      //criamos um spy que observa o fakeBookRepository
      const spy = jest.spyOn(fakeBookRepository, "getAll");

      //chamamos o método getAll do service
      await bookService.getAll();

      //verificamos se o método foi chamado
      expect(spy).toHaveBeenCalled();
    });
    it("should return a list of books", async () => {
      const books = await bookService.getAll();
      expect(books).toEqual(fakeBookData);
    });
    it("should return an promiseError", async () => {
      //simulando uma situação de erro
      jest.spyOn(fakeBookRepository, "getAll").mockRejectedValueOnce("Error");

      //atribui esse erro a uma consntante
      const error = await bookService.getAll();

      //verifica se o erro foi tratado de devida forma
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
  });

  describe("getByAuthor", () => {
    it("should call Repository.getByAuthor", async () => {
      //criamos um spy que observa o fakeBookRepository
      const spy = jest.spyOn(fakeBookRepository, "getByAuthor");

      //chamamos o método getByAuthor do service
      await bookService.getByAuthor("Author");

      //verificamos se o método foi chamado
      expect(spy).toHaveBeenCalled();
    });
    it("should return a list of books by author", async () => {
      const books = await bookService.getByAuthor(fakeBookData[0].author);
      expect(books).toEqual(fakeBookData);
    });
    it("should return an promiseError", async () => {
      //simulando uma situação de erro
      jest
        .spyOn(fakeBookRepository, "getByAuthor")
        .mockRejectedValueOnce("Error");

      //atribui esse erro a uma consntante
      const error = await bookService.getByAuthor("Author");

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
      const spy = jest.spyOn(fakeBookRepository, "getById");
      await bookService.getById(fakeId);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a book", async () => {
      const book = await bookService.getById(fakeId);
      expect(book).toEqual(fakeBookData[0]);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeBookRepository, "getById").mockRejectedValueOnce("Error");
      const error = await bookService.getById(fakeId);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
    it("should return a invalidIdError", async () => {
      const error = await bookService.getById("invalidId");
      expect(error).toEqual(invalidIdError("invalidId"));
    });
  });

  describe("create", () => {
    it("should call Repository.create", async () => {
      const spy = jest.spyOn(fakeBookRepository, "create");
      await bookService.create(fakeBookData[0]);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a book", async () => {
      const book = await bookService.create(fakeBookData[1]);
      expect(book).toEqual(fakeBookData[1]);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeBookRepository, "create").mockRejectedValueOnce("Error");
      const error = await bookService.create(fakeBookData[1]);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
  });

  describe("update", () => {
    it("should call Repository update", async () => {
      const spy = jest.spyOn(fakeBookRepository, "update");
      await bookService.update(fakeId, updatedBook);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a book", async () => {
      const book = await bookService.update(fakeId, updatedBook);
      expect(book).toEqual(updatedBook);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeBookRepository, "update").mockRejectedValueOnce("Error");
      const error = await bookService.update(fakeId, updatedBook);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });

    it("should return a invalidIdError", async () => {
      const error = await bookService.update("invalidId", updatedBook);
      expect(error).toEqual(invalidIdError("invalidId"));
    });
  });

  describe("updateStatusBook", () => {
    it("should call Repository.updateStatusBook", async () => {
      const spy = jest.spyOn(fakeBookRepository, "updateStatusBook");
      await bookService.updateStatusBook(fakeId, updatedBook);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a updated book", async () => {
      const book = await bookService.updateStatusBook(fakeId, updatedBook);
      expect(book).toEqual(updatedBook);
    });
    it("should return an promiseError", async () => {
      jest
        .spyOn(fakeBookRepository, "updateStatusBook")
        .mockRejectedValueOnce("Error");
      const error = await bookService.updateStatusBook(fakeId, updatedBook);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });

    it("should return a invalidIdError", async () => {
      const error = await bookService.updateStatusBook(
        "invalidId",
        updatedBook
      );
      expect(error).toEqual(invalidIdError("invalidId"));
    });
  });
});
