import { Book, BookModel } from "../models/book.model";
import { Model } from "mongoose";

export class BookRepository {
  constructor(private readonly bookModel: Model<Book>) {}

  async getAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }
  async getByAuthor(author: string): Promise<Book[]> {
    const books = await this.bookModel.find({ author: author });
    //chave   parametro
    return books;
  }

  async getById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).populate("review");
    //O populate faz com o mongo acesse o objeto, ele é necessário pois o mongo é um banco não relacional.
    if (book === null) {
      return {} as Book;
    }

    return book;
  }

  async create(book: Book): Promise<Book> {
    const newBook = this.bookModel.create(book);
    return newBook;
  }

  async update(id: string, book: Book): Promise<Book> {
    const { language, review } = book;
    //desestruturando apenas o que será atualizado as chaves e instanciando

    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      {
        $set: {
          language: language,
        },
        $push: {
          review: review,
        },
      },
      {
        new: true,
        //aqui ele retorna o objeto atualizado com as novas informações.
      }
    );

    if (updatedBook === null) {
      return {} as Book;
    }

    return updatedBook;
  }

  async updateStatusBook(id: string, book: Book): Promise<Book> {
    const { status } = book;
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: status,
        },
      },
      {
        new: true,
      }
    );

    if (updatedBook === null) {
      return {} as Book;
    }

    return updatedBook;
  }
}
