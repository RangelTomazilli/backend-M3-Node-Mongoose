import { Review } from "../models/reviews.model";

export const fakeId = "632130d41623c49bf7b1c7e9";

export const fakeReviewData: Review[] = [
  {
    title: "Lorem Ipsum",
    review: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut enim ultricies, eleifend quam eu, porta mauris. Vivamus semper lectus vitae est cursus aliquet. Aliquam orci dui",
    ],
    editDate: ["26/04/2000"],
    rate: 4,
  },
  {
    title: "Lorem Ipsum",
    review: [
      "Lorem ipsum dolor amet, consectetur adipiscing elit. Mauris ut enim ultricies, eleifend quam eu, porta mauris. Vivamus semper lectus vitae est cursus alique. Aliquam orci dui",
    ],
    editDate: ["27/04/2000"],
    rate: 5,
  },
  {
    title: "Lorem Ipsum dolor",
    review: [
      "Lorem ipsum dolor amet, consectetur adipiscing elit. Mauris ut enim ultricies, eleifend quam eu, porta mauris. Vivamus semper lectus vitae est cursus alquet. Aliquam orci dui",
    ],
    editDate: ["21/04/2000"],
    rate: 3,
  },
];

export const updatedReview: Review = {
  title: "Lorem Ipsum dolum",
  review: [
    "Lorem ipsum dolor amet, consectetur adipiscing elit. Mauris ut enim ultricies, eleifend quam eu, porta mauris. Vivamus semper lectus vitae est cursus alquet. Aliqua orci dui",
  ],
  editDate: ["21/05/2000"],
  rate: 2,
};

export const fakeReviewsInvalidBody = {
  title: "Lorem Ipsum dolum lalala",
  review: [
    "Lorem ipsum dolor amet, consectetur adipiscing elit. Mauris ut enim ultricies, eleifend quam eu, porta mauris. Vivamus semper lectus vitae est cursus alquet. Aliqua orci duiVivamus semper lectus vitae est cursus alquet. Aliqua orci dui",
  ],
};
