import { By } from "selenium-webdriver";
import {
  findElementByText,
  getParent,
  sleep,
  waitUntilPageLoadingFinished,
} from "../utils/helpers.js";
import { postBot } from "../telegram.js";
import { isNumberInString } from "../utils/utils.js";

const formPath =
  "/html/body/app-root/div/app-eligibility-criteria/section/form/mat-card[1]/form";

export const appointmentDetails = async (driver) => {
  console.log("start filling appointment details");

  await waitUntilPageLoadingFinished(driver);

  // do no need reselect below fields if is second check
  // select visa center
  await driver
    .findElement(By.xpath(`${formPath}/div[1]/mat-form-field`))
    .click();
  const centerOptionSpan = await findElementByText(
    process.env.VISA_CENTER,
    driver
  );
  const centerOption = await getParent(centerOptionSpan, driver);
  await centerOption.click();

  await waitUntilPageLoadingFinished(driver);

  // select visa category
  await driver
    .findElement(By.xpath(`${formPath}/div[2]/mat-form-field`))
    .click();
  const categoryOptionSpan = await findElementByText(
    process.env.VISA_CATEGORY,
    driver
  );
  const categoryOption = await getParent(categoryOptionSpan, driver);
  await categoryOption.click();

  await waitUntilPageLoadingFinished(driver);

  // select visa sub-category
  await driver
    .findElement(By.xpath(`${formPath}/div[3]/mat-form-field`))
    .click();

  // if is second check will try to find PRIME TIME visas
  const excludeString = "PRIME TIME";
  const subCategoryOptionSpan = await findElementByText(
    process.env.VISA_SUBCATEGORY,
    driver,
    excludeString
  );

  const subCategoryOption = await getParent(subCategoryOptionSpan, driver);
  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    subCategoryOption
  );

  await subCategoryOption.click();
  // isSecondCheck
  //   ? await subCategoryOptionSpan.click()
  //   : await subCategoryOption.click();

  await waitUntilPageLoadingFinished(driver);

  // checks is there are numbers in message with available slots
  const message = await driver
    .findElement(By.xpath(`${formPath}/div[4]/div`))
    .getText();
  const isSlotsAvailable = isNumberInString(message);

  // if no slots, will check PRIME TIME visas, if already checked for prime - quit
  if (!isSlotsAvailable) {
    !isSecondCheck
      ? await appointmentDetails(driver, true)
      : await driver.quit();
    return;
  }

  // sending message to telegram bot
  await postBot(message.toString());

  console.log("submit appointment details");

  return await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/div/app-eligibility-criteria/section/form/mat-card[2]/button"
      )
    )
    .click();
};
