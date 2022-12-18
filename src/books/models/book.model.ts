import { Schema, model, Model, InferSchemaType } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 24,
    },
    criationDate: {
      type: String,
      required: true,
    },
    language: {
      type: [String],
      required: true,
      maxlength: 18,
    },
    status: {
      type: Boolean,
      required: true,
    },
    review: {
      //o tipo desse parâmetro é um ObjectId do tipo Review
      type: Schema.Types.ObjectId,
      //o ref é o nome do model/collection que está sendo referenciado
      ref: "Reviews",
    },
    author: {
      type: String,
      required: true,
      maxlength: 24,
      unique: true,
    },
  },
  {
    //cria atomaticamente as dates (createtedAt, UpdatedAt...)
    timestamps: true,
  }
);

//tipamos a Schema com o InferSchemaType, nativo da mongoose
export type Book = InferSchemaType<typeof bookSchema>;

//tipamos o model com o Book (custom type criado acima) e inicializamos
//criamos um objeto com os métodos do model(mongoose)

export const BookModel: Model<Book> = model("Book", bookSchema);
