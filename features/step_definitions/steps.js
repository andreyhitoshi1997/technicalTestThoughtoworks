const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { MarsAirPage } = require('../../pages/MarsAirPage');
const { baseUrl, headlessValue } = require('../../helpers/config');

Before(async function () {
  this.browser = await chromium.launch({ headless: headlessValue });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.marsAirPage = new MarsAirPage(this.page);
});

After(async function () {
  await this.context.close();
  await this.browser.close();
});

Given('I am on the Mars Air homepage', async function () {
  await this.marsAirPage.navigate(baseUrl);
});

When('I search for a flight with departing {string} and returning {string} and a {string}', async function (departing, returning, promoCode) {
  await this.marsAirPage.searchFlights(departing, returning, promoCode);
});

Then('I should see the message {string}', async function (messageResult) {
  const result = await this.marsAirPage.resultText.textContent();
  expect(result).toContain(messageResult);
});
