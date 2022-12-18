import {
  fakeBookData,
  updatedBook,
  fakeId,
} from "./../__mocks__/fake.book.data";
import { fakeBookModel } from "../__mocks__/fake.book.model";
import { BookRepository } from "./book.repository";
import { jest } from "@jest/globals";

const bookRepository = new BookRepository(fakeBookModel);

describe("BookRepository", () => {
  describe("getAll", () => {
    it("should return a list of books", async () => {
      const books = await bookRepository.getAll();
      expect(books).toEqual(fakeBookData);
    });
    it("should return an empty array", async () => {
      //o spyOn entra no fakeBookModel e substitui o find por uma função de
      //retorno vazio
      jest.spyOn(fakeBookModel, "find").mockResolvedValueOnce([]);
      //spyOn apenas observa o model e o metodo informado em seu parametro, quem faz a resolução é a função em sequencia.

      const books = await bookRepository.getAll();
      expect(books).toEqual([]);
    });
  });
  describe("getByAuthor", () => {
    it("should return a list of books by author", async () => {
      jest.spyOn(fakeBookModel, "find").mockResolvedValue([fakeBookData[0]]);
      //aqui deve-se usar o spyon pois o retorno deve ser alterado ser especifico para o autor e é necessário envolver em um array por causa da
      //tipagem do retorno da função pois é esperado um array de objetos
      const books = await bookRepository.getByAuthor("J.R. Tolkien");
      expect(books).toEqual([fakeBookData[0]]);
    });
    it("should return an empty array", async () => {
      jest.spyOn(fakeBookModel, "find").mockResolvedValue([]);
      const books = await bookRepository.getByAuthor("Inexistente");
      expect(books).toEqual([]);
    });
  });
  describe("getById", () => {
    it("should return a book", async () => {
      const book = await bookRepository.getById(fakeId);
      expect(book).toEqual(fakeBookData[0]);
    });
    it("should return an empty object", async () => {
      jest.spyOn(fakeBookModel, "findById").mockImplementationOnce(
        () =>
          ({
            populate: jest.fn().mockImplementationOnce(() => null),
          } as any)
      );
      const book = await bookRepository.getById(fakeId);
      expect(book).toEqual({});
    });
  });
  describe("create", () => {
    it("should create a book", async () => {
      const newBook = await bookRepository.create(fakeBookData[0]);
      expect(newBook).toEqual(fakeBookData[0]);
    });
  });
  describe("update", () => {
    it("should update a book", async () => {
      const book = await bookRepository.update(fakeId, fakeBookData[0]);
      expect(book).toEqual(updatedBook);
    });
    it("should return an empty object", async () => {
      jest
        .spyOn(fakeBookModel, "findByIdAndUpdate")
        .mockResolvedValueOnce(null);

      const book = await bookRepository.update(fakeId, fakeBookData[0]);
      expect(book).toEqual({});
    });
  });
  describe("updateupdateStatusBook", () => {
    it("should update a status of a book", async () => {
      const book = await bookRepository.updateStatusBook(
        fakeId,
        fakeBookData[0]
      );
      expect(book).toEqual(updatedBook);
    });
    it("should return an empty object", async () => {
      jest
        .spyOn(fakeBookModel, "findByIdAndUpdate")
        .mockResolvedValueOnce(null);

      const book = await bookRepository.updateStatusBook(
        fakeId,
        fakeBookData[0]
      );
      expect(book).toEqual({});
    });
  });
});
