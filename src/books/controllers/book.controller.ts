import { BookService } from "../services/book.service";
import { StatusCode } from "../../utils/status.code";
import { Request, Response } from "express";

export class BookController {
  constructor(private readonly bookService: BookService) {}

  async getAll(req: Request, res: Response) {
    //se na requisição do front houver um author, ele será salvo nesta variável. Se não ela será nula.
    const author = req.query.author;
    if (author) {
      const result = await this.bookService.getByAuthor(author as string);
      //recebendo um author o get será feito pela query por author
      return res.status(StatusCode.OK).json(result);
    }
    const result = await this.bookService.getAll();
    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }
    return res.status(StatusCode.OK).json(result);
  }

  async getById(req: Request, res: Response) {
    //req.params refere-se a um parâmetro de rota
    //exemplo: /books/:id -> wwww.books.com/books/123 -> req.params.id = 123
    const { id } = req.params;

    const result = await this.bookService.getById(id);

    if ("invalidIdError" in result) {
      return res.status(StatusCode.BAD_REQUEST).json(result);
    }

    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }

    return res.status(StatusCode.OK).json(result);
  }

  async create(req: Request, res: Response) {
    const { body } = req;

    //é uma linha tradicional de validação de dados

    const result = await this.bookService.create(body);

    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }

    return res.status(StatusCode.CREATED).json(result);
  }

  async update(req: Request, res: Response) {
    // req.body -> Body/JSON
    // req.params -> URL Params
    // req.query  -> Query Params

    const { id } = req.params;
    const { body } = req;

    const result = await this.bookService.update(id, body);

    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }

    if ("invalidIdError" in result) {
      return res.status(StatusCode.BAD_REQUEST).json(result);
    }

    return res.status(StatusCode.OK).json(result);
  }

  async updateStatusBook(req: Request, res: Response) {
    // req.body -> Body/JSON
    // req.params -> URL Params
    // req.query  -> Query Params

    const { id } = req.params;
    const { body } = req;

    const result = await this.bookService.updateStatusBook(id, body);

    if ("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);
    }

    if ("invalidIdError" in result) {
      return res.status(StatusCode.BAD_REQUEST).json(result);
    }

    return res.status(StatusCode.OK).json(result);
  }
}
