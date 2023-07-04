import { By } from "selenium-webdriver";
import { waitUntilPageLoadingFinished } from "../utils/helpers.js";

export const insurance = async (driver) => {
  console.log("Load insurance page");

  await waitUntilPageLoadingFinished(driver);

  console.log("Continue to next step");

  await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/div/app-travel-medical-insurance/section/mat-card[2]/div/div[2]/button"
      )
    )
    .click();

  // confirm
  return await driver
    .findElement(
      By.xpath(
        "/html/body/div[6]/div[2]/div/mat-dialog-container/div/div[2]/div[2]/button"
      )
    )
    .click();
};
