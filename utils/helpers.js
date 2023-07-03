import { By, until } from "selenium-webdriver";

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const waitUntilTextOnPage = async (text, driver) => {
  const html = await driver.findElement(By.tagName("html"));

  return await driver.wait(until.elementTextContains(html, text));
};

export const waitUntilTextInElement = async (element, text, driver) => {
  return await driver.wait(until.elementTextContains(element, text));
};

export const waitUntilPageLoadingFinished = async (driver) => {
  const overlay = await driver.findElement(
    By.xpath("/html/body/app-root/ngx-ui-loader/div[1]")
  );

  await driver.wait(until.elementIsNotVisible(overlay));
};
