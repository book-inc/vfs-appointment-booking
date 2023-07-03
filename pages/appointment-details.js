import { By } from "selenium-webdriver";
import {
  findElementByText,
  getParent,
  waitUntilPageLoadingFinished,
} from "../utils/helpers.js";

const formPath =
  "/html/body/app-root/div/app-eligibility-criteria/section/form/mat-card[1]/form";

export const appointmentDetails = async (driver) => {
  console.log("start filling appointment details");

  await waitUntilPageLoadingFinished(driver);

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
  const subCategoryOptionSpan = await findElementByText(
    process.env.VISA_SUBCATEGORY,
    driver,
    "PRIME TIME"
  );
  const subCategoryOption = await getParent(subCategoryOptionSpan, driver);
  await subCategoryOption.click();

  await waitUntilPageLoadingFinished(driver);

  console.log("submit appointment details");

  return await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/div/app-eligibility-criteria/section/form/mat-card[2]/button"
      )
    )
    .click();
};
