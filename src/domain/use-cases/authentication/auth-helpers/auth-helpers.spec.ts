import { AuthHelpers } from "./auth-helpers";

describe("AuthHelpers", () => {
  let authHelpers: AuthHelpers;

  beforeEach(() => {
    authHelpers = new AuthHelpers();
  });

  it("Should return a timestamp in numbers", () => {
    const expirationTimestamp = authHelpers.generationTokenExpirationDate();
    expect(typeof expirationTimestamp).toBe("number");
  });

  it("Should generate a token expiration date one week from now", () => {
    const now = new Date();
    const oneWeekInMilliseconds = 60 * 24 * 7 * 60 * 1000; // 1 week in milliseconds
    const expectedExpirationDate = new Date(
      now.getTime() + oneWeekInMilliseconds
    );

    const expirationTimestamp = authHelpers.generationTokenExpirationDate();
    const actualExpirationDate = new Date(expirationTimestamp);

    const marginOfError = 1000; // 1 second in milliseconds
    expect(
      Math.abs(
        actualExpirationDate.getTime() - expectedExpirationDate.getTime()
      )
    ).toBeLessThan(marginOfError);
  });
});
