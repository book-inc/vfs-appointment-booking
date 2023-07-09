import { By, until } from "selenium-webdriver";
import { getRandomArbitrary } from "./utils.js";
import { getProxyList } from "../services/get-proxy-list.js";

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const waitUtilElement = async (
  driver,
  elementIdentifier,
  timeout = 2000
) => {
  return await driver.wait(until.elementLocated(elementIdentifier), timeout);
};

export const waitUntilTextOnPage = async (text, driver, timeout) => {
  await waitUtilElement(driver, By.tagName("html"), 4000);

  const html = await driver.findElement(By.tagName("html"));

  return await driver.wait(until.elementTextContains(html, text), timeout);
};

export const waitUntilTextInElement = async (
  element,
  text,
  driver,
  timeout
) => {
  return await driver.wait(until.elementTextContains(element, text), timeout);
};

export const waitUntilPageLoadingFinished = async (driver) => {
  const overlay = await driver.findElement(
    By.xpath("/html/body/app-root/ngx-ui-loader/div[1]")
  );

  await driver.wait(until.elementIsNotVisible(overlay));
};

export const findElementByText = async (text, driver, restrictionString) => {
  if (!restrictionString) {
    return await driver.findElement(
      By.xpath(`//*[contains(text(),'${text}')]`)
    );
  }

  return await driver.findElement(
    By.xpath(
      `//*[contains(text(),'${text}')][not(contains(text(),'${restrictionString}'))]`
    )
  );
};

export const getParent = async (targetElement, driver) => {
  return await driver.executeScript(
    "return arguments[0].parentNode;",
    targetElement
  );
};

export const getRandomIp = async () => {
  const list = await getProxyList();
  const index = getRandomArbitrary(0, list.length);

  return list[index];
};

export const forceDropdown = async (
  driver,
  selectBox,
  optionText,
  excludeString
) => {
  // open dropdown
  await selectBox.click();

  // select option
  const optionSpan = await findElementByText(optionText, driver, excludeString);
  const optionParent = await getParent(optionSpan, driver);
  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    optionParent
  );
  return await optionParent.click();
};
