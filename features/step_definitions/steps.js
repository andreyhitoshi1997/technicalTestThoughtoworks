const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { MarsAirPage } = require('../../pages/MarsAirPage');

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
});

After(async function () {
  await this.context.close();
  await this.browser.close();
});

Given('I am on the Mars Air homepage', async function () {
  const page = await this.context.newPage();
  this.marsAirPage = new MarsAirPage(page);
  await this.marsAirPage.navigate('https://marsair.recruiting.thoughtworks.net/AndreyOnoue');
});

When('I search for a flight with departing {string} and returning {string} and a {string}', async function (departing, returning, promoCode) {
  await this.marsAirPage.searchFlights(departing, returning, promoCode);
});

Then('I should see the flight search result', async function () {
  const result = await this.marsAirPage.resultText.textContent();
  expect(result).toContain('Unfortunately,');
});