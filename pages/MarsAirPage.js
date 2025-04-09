
export class MarsAirPage {
  constructor(page) {
    this.page = page;
    this.departingSelect = page.locator('select#departing');
    this.returningSelect = page.locator('select#returning');
    this.promoCodeInput = page.locator('#promotional_code');
    this.searchButton = page.locator('input[type="submit"]');
    this.resultText = page.locator('#content > p:nth-child(2)');
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async searchFlights(departing, returning, promoCode) {
    await this.departingSelect.selectOption(departing, { timeout: 10000 });
    await this.returningSelect.selectOption(returning, { timeout: 10000 });
    await this.promoCodeInput.type(promoCode);
    await this.searchButton.click();
  }
}
