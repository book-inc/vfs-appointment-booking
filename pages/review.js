import { By } from "selenium-webdriver";
import { waitUntilPageLoadingFinished } from "../utils/helpers.js";

export const review = async (driver) => {
  console.log("Load review page");

  await waitUntilPageLoadingFinished(driver);

  // accept terms
  await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/div/app-review-and-payment/section/form/mat-card[1]/div[8]/div/mat-checkbox"
      )
    )
    .click();

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
