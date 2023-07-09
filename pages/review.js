import { By } from "selenium-webdriver";
import {
  waitUntilPageLoadingFinished,
  waitUntilTextOnPage,
} from "../utils/helpers.js";

export const review = async (driver) => {
  console.log("Load review page");

  await waitUntilPageLoadingFinished(driver);

  await waitUntilTextOnPage(
    "Yes, I agree to receive future communication on optional value added services offered by VFS Global",
    driver
  );

  // accept terms
  await driver.findElement(By.id("mat-checkbox-3")).click();

  // submit
  await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/div/app-review-and-payment/section/form/mat-card[2]/div/div[2]/button"
      )
    )
    .click();

  await waitUntilPageLoadingFinished(driver);

  console.log("Continue to next step");

  // continue
  await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/div/app-review-and-payment/section/mat-card/div[2]/div[2]/button"
      )
    )
    .click();
};
