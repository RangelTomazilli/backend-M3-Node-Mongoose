import { faker } from "@faker-js/faker";
import { BookModel } from "../../books/models/book.model";
import { ReviewModel } from "../../reviews/models/reviews.model";
import { mongoConnect, mongoDisconnect } from "../mongo.connection";

const bookFac = (id: any) => {
  return {
    title: faker.lorem.words(2),
    criationDate: new Date(),
    language: ["Inglês", "Português", "Italiano"],
    status: true,
    review: id,
    author: faker.name.fullName(),
  };
};
const reviewsFac = [
  {
    title: faker.lorem.words(2),
    review: [faker.lorem.paragraph(1)],
    editDate: [new Date()],
    rate: 4,
  },
];

export async function seeder() {
  try {
    const review = reviewsFac;
    await ReviewModel.create(review);
    console.log("DB successfully seeded");
    console.log("Your Reviews are on your DB");
  } catch (error) {
    console.log(`failed to seed Reviews`);
    console.log(error);
  }

  const reviews = await ReviewModel.find();
  const review = reviews[reviews.length - 1];
  console.log(review.id);
  try {
    const book = bookFac(review.id);
    await BookModel.create(book);
    console.log("Your Books are on your DB");
  } catch (error) {
    console.log(`failed to seed Books`);
    console.log(error);
  }
}

(async () => {
  mongoConnect();
  await seeder();
  mongoDisconnect();
})();
