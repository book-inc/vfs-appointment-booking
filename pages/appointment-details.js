import { By } from "selenium-webdriver";
import {
  forceDropdown,
  waitUntilPageLoadingFinished,
} from "../utils/helpers.js";
import { isNumberInString } from "../utils/utils.js";
import { postBot } from "../services/telegram-requests.js";
import { visaCenters } from "../config.js";

const formPath =
  "/html/body/app-root/div/app-eligibility-criteria/section/form/mat-card[1]/form";

const checkDates = async (
  driver,
  visaCenterSelect,
  visaCategorySelect,
  visaSubCategorySelect,
  visaCenterOptionText
) => {
  // select visa center option
  await forceDropdown(driver, visaCenterSelect, visaCenterOptionText);
  await waitUntilPageLoadingFinished(driver);

  // select visa category option
  await forceDropdown(driver, visaCategorySelect, process.env.VISA_CATEGORY);
  await waitUntilPageLoadingFinished(driver);

  // select visa sub-category option
  const excludeString = "PRIME TIME";
  await forceDropdown(
    driver,
    visaSubCategorySelect,
    process.env.VISA_SUBCATEGORY,
    excludeString
  );
  await waitUntilPageLoadingFinished(driver);

  // checks is there are numbers in message with available slots
  const message = await driver
    .findElement(By.xpath(`${formPath}/div[4]/div`))
    .getText();

  const isSlotsAvailable = isNumberInString(message);

  return { message, isSlotsAvailable };
};

export const appointmentDetails = async (driver) => {
  console.log("start filling appointment details");

  await waitUntilPageLoadingFinished(driver);

  const visaCenterSelect = await driver.findElement(
    By.xpath(`${formPath}/div[1]/mat-form-field`)
  );

  const visaCategorySelect = await driver.findElement(
    By.xpath(`${formPath}/div[2]/mat-form-field`)
  );

  const visaSubCategorySelect = await driver.findElement(
    By.xpath(`${formPath}/div[3]/mat-form-field`)
  );
  //
  // await visaCenters.forEach(async () => {
  //   return await checkDates(
  //     driver,
  //     visaCenterSelect,
  //     visaCategorySelect,
  //     visaSubCategorySelect
  //   );
  // });

  let isSlotsAvailable = false;
  let message = "";
  let counter = 0;
  while (counter < visaCenters.length && !isSlotsAvailable) {
    const { message: newMessage, isSlotsAvailable: newState } =
      await checkDates(
        driver,
        visaCenterSelect,
        visaCategorySelect,
        visaSubCategorySelect,
        visaCenters[counter]
      );
    isSlotsAvailable = newState;
    message = newMessage;
    counter++;
  }

  // // select visa center
  // await driver
  //   .findElement(By.xpath(`${formPath}/div[1]/mat-form-field`))
  //   .click();
  //
  // const centerOptionSpan = await findElementByText(
  //   process.env.VISA_CENTER,
  //   driver
  // );
  // const centerOption = await getParent(centerOptionSpan, driver);
  // await driver.executeScript(
  //   "arguments[0].scrollIntoView(true);",
  //   centerOption
  // );
  // await centerOption.click();

  // await waitUntilPageLoadingFinished(driver);

  // select visa category
  // await driver
  //   .findElement(By.xpath(`${formPath}/div[2]/mat-form-field`))
  //   .click();
  // const categoryOptionSpan = await findElementByText(
  //   process.env.VISA_CATEGORY,
  //   driver
  // );
  // const categoryOption = await getParent(categoryOptionSpan, driver);
  // await categoryOption.click();
  //
  // await waitUntilPageLoadingFinished(driver);
  //
  // // select visa sub-category
  // await driver
  //   .findElement(By.xpath(`${formPath}/div[3]/mat-form-field`))
  //   .click();
  //
  // const excludeString = "PRIME TIME";
  // const subCategoryOptionSpan = await findElementByText(
  //   process.env.VISA_SUBCATEGORY,
  //   driver,
  //   excludeString
  // );
  //
  // const subCategoryOption = await getParent(subCategoryOptionSpan, driver);
  // await driver.executeScript(
  //   "arguments[0].scrollIntoView(true);",
  //   subCategoryOption
  // );
  //
  // await subCategoryOption.click();
  //
  // await waitUntilPageLoadingFinished(driver);
  //
  // // checks is there are numbers in message with available slots
  // const message = await driver
  //   .findElement(By.xpath(`${formPath}/div[4]/div`))
  //   .getText();
  // const isSlotsAvailable = isNumberInString(message);

  // if no slots, will check PRIME TIME visas, if already checked for prime - quit
  if (!isSlotsAvailable) {
    throw new Error();
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
