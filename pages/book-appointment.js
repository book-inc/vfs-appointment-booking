import { By } from "selenium-webdriver";
import {
  findElementByText,
  waitUntilPageLoadingFinished,
  waitUntilTextOnPage,
} from "../utils/helpers.js";

export const bookAppointment = async (driver) => {
  console.log("Start selecting date");

  await waitUntilPageLoadingFinished(driver);

  // select date
  const dateOption = await driver.findElement(
    By.className("fc-day-future date-availiable")
  );
  await dateOption.click();

  await waitUntilTextOnPage("Choose an appointment time", driver);

  // select time
  await driver.findElement(By.id("STRadio1")).click();

  console.log("Finish selecting date");
  return await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/div/app-book-appointment/section/mat-card[2]/div/div[2]/button"
      )
    )
    .click();
};
