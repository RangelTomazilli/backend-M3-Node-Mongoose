import { reviewFactory } from "./reviews.factory";

describe("UserFactory", () => {
  it("should create the user Domain", () => {
    expect(reviewFactory()).toBeDefined();
  });
});
