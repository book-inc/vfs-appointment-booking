import { By } from "selenium-webdriver";
import { waitUntilPageLoadingFinished } from "../utils/helpers.js";

export const services = async (driver) => {
  console.log("Load services page");

  await waitUntilPageLoadingFinished(driver);

  console.log("Continue to next step");
  return await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/div/app-manage-service/section/mat-card[2]/div/div[2]/button"
      )
    )
    .click();
};
