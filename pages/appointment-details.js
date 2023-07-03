import { By } from "selenium-webdriver";
import { waitUntilPageLoadingFinished } from "../utils/helpers.js";

export const appointmentDetails = async (driver) => {
  await waitUntilPageLoadingFinished(driver);

  await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/div/app-eligibility-criteria/section/form/mat-card[1]/form/div[1]/mat-form-field"
      )
    )
    .click();

  // await driver.findElement(By.xpath('//*[@id="mat-option-6"]')).click();
};
