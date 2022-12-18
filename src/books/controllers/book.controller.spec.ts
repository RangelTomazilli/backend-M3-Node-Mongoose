import { mockResponse, mockRequest } from "../__mocks__/fake.book.routes";
import { fakeBookService } from "../__mocks__/fake.book.service";
import { BookService } from "../services/book.service";
import { fakeBookRepository } from "../__mocks__/fake.book.repository";
import { BookController } from "./book.controller";
import { fakeId, fakeBookData } from "../__mocks__/fake.book.data";
import { StatusCode } from "../../utils/status.code";
import { invalidIdError, promiseError } from "../../utils/error.handler";

const bookService = new BookService(fakeBookRepository);
const bookController = new BookController(fakeBookService);
const req = mockRequest();
const res = mockResponse();

describe("BookController", () => {
  describe("getAll", () => {
    it("should return all books", async () => {
      await bookController.getAll(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeBookData);
    });
    it("Deve se conectar em Repository.getAllByAuthor", async () => {
      const spy = jest.spyOn(fakeBookRepository, "getByAuthor");
      await bookService.getByAuthor(fakeBookData[0].author);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a list of books by author name", async () => {
      await bookService.getByAuthor(fakeBookData[0].author);
      expect(res.json).toHaveBeenCalledWith(fakeBookData);
    });
    it("should return status code 200", async () => {
      await bookController.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
    it("should return a promiseError", async () => {
      jest
        .spyOn(fakeBookService, "getAll")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
  });

  describe("getById", () => {
    it("should return a book", async () => {
      req.params.id = fakeId;
      await bookController.getById(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeBookData[0]);
    });
    it("should return status code 200", async () => {
      req.params.id = fakeId;
      await bookController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
    it("should return a promiseError", async () => {
      req.params.id = fakeId;
      jest
        .spyOn(fakeBookService, "getById")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
    it("should return a invalidIdError", async () => {
      jest
        .spyOn(fakeBookService, "getById")
        .mockImplementation(() => Promise.resolve(invalidIdError("id")));
      await bookController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
    });
  });

  describe("create", () => {
    it("should create a book", async () => {
      req.body = fakeBookData[1];
      await bookController.create(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeBookData[1]);
    });
    it("should return status code 201", async () => {
      req.body = fakeBookData[1];
      await bookController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.CREATED);
    });
    it("should return a promiseError", async () => {
      req.body = fakeBookData[1];
      jest
        .spyOn(fakeBookService, "create")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
  });

  describe("update", () => {
    it("should update a book", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[1];
      await bookController.update(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeBookData[1]);
    });
    it("should return status code 200", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[1];
      await bookController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
    it("should return a promiseError", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[1];
      jest
        .spyOn(fakeBookService, "update")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
    it("should return a invalidIdError", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[1];
      jest
        .spyOn(fakeBookService, "update")
        .mockImplementation(() => Promise.resolve(invalidIdError("id")));

      await bookController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
    });
  });

  describe("updateStatusBook", () => {
    it("should update a status of a book", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      await bookController.updateStatusBook(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeBookData[0]);
    });
    it("should return status code 200", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      await bookController.updateStatusBook(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
    it("should return a promiseError", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      jest
        .spyOn(fakeBookService, "updateStatusBook")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.updateStatusBook(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
    it("should return a invalidIdError", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[1];
      jest
        .spyOn(fakeBookService, "updateStatusBook")
        .mockImplementation(() => Promise.resolve(invalidIdError("id")));

      await bookController.updateStatusBook(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
    });
  });
});
