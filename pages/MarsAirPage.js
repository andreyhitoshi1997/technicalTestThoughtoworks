export class MarsAirPage {
  constructor(page) {
    this.page = page;
    this.departingSelect = page.locator('#departing');
    this.returningSelect = page.locator('#returning');
    this.promoCodeInput = page.locator('#promotional_code');
    this.searchButton = page.locator('input[type="submit"]');
    this.resultText = page.locator('#content > p:nth-child(2)');
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async searchFlights(departing, returning, promoCode) {
    await this.departingSelect.selectOption(departing);
    await this.returningSelect.selectOption(returning);
    await this.promoCodeInput.type(promoCode);
    await this.searchButton.click();
  }
}
