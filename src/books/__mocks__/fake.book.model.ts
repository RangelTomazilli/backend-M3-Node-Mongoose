import { Model } from "mongoose";
import { Book } from "../models/book.model";
import { fakeBookData, updatedBook } from "./fake.book.data";

export const fakeBookModel = {
  find: () => Promise.resolve(fakeBookData),
  findById: jest.fn().mockImplementation(() =>
    //jest.fn é o tudao do jest que na verdade é para uitilizar o mockimplementation, sem ele não é possível usa-lo
    ({
      populate: jest.fn().mockImplementation(() => fakeBookData[0]),
      //Com o findbyid executado pelo jest.fn->mockimplementation, é possível acessar a função populate e assim novamente "mockar"
      //a execução dela podendo acessar o retorno desejado que é fakebookData[0]. (função chamando função mockan os retornos)
      //Lembrando que o mockimplementation deve sempre ter como parametro uma arrowFunction.
    })
  ),
  create: () => Promise.resolve(fakeBookData[0]),
  findByIdAndUpdate: () => Promise.resolve(updatedBook),
} as unknown as Model<Book>;
