import { By } from "selenium-webdriver";
import { waitUntilPageLoadingFinished } from "../utils/helpers.js";

export const startBooking = async (driver) => {
  console.log("Start booking page");

  await waitUntilPageLoadingFinished(driver);

  const button = await driver.findElement(
    By.xpath(
      "/html/body/app-root/div/app-dashboard/section[1]/div/div[2]/button"
    )
  );

  await button.click();

  return button;
};
