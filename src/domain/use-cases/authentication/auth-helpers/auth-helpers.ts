export class AuthHelpers {
  generationTokenExpirationDate() {
    const tokenNow = new Date();
    const tokenMinutes = 60 * (24 * 7); // 1 week

    return new Date(
      tokenNow.setMinutes(tokenNow.getMinutes() + tokenMinutes)
    ).getTime();
  }
}
