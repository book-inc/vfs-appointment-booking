import { By } from "selenium-webdriver";
import {
  findElementByText,
  getParent,
  waitUntilPageLoadingFinished,
} from "../utils/helpers.js";

export const yourDetails = async (driver) => {
  console.log("Start your details");

  await waitUntilPageLoadingFinished(driver);

  // first name
  await driver
    .findElement(By.xpath(`//*[@id="mat-input-2"]`))
    .sendKeys(process.env.FIRST_NAME);

  // last name
  await driver
    .findElement(By.xpath(`//*[@id="mat-input-3"]`))
    .sendKeys(process.env.LAST_NAME);

  // gender
  await driver.findElement(By.xpath(`//*[@id="mat-select-6"]`)).click();
  const genderOptionSpan = await findElementByText(process.env.GENDER, driver);
  const genderOption = await getParent(genderOptionSpan, driver);
  await genderOption.click();

  await waitUntilPageLoadingFinished(driver);

  // Date of birth
  await driver
    .findElement(By.xpath(`//*[@id="dateOfBirth"]`))
    .sendKeys(process.env.DATE_OF_BIRTH);

  // nationality
  await driver.findElement(By.xpath(`//*[@id="mat-select-6"]`)).click();
  const nationalityOptionSpan = await findElementByText(
    process.env.NATIONALITY,
    driver
  );
  const nationalityOption = await getParent(nationalityOptionSpan, driver);
  await nationalityOption.click();

  await waitUntilPageLoadingFinished(driver);

  // passport
  await driver
    .findElement(By.xpath(`//*[@id="mat-input-4"]`))
    .sendKeys(process.env.PASSPORT);

  // Passport date
  await driver
    .findElement(By.xpath(`//*[@id="passportExpirtyDate"]`))
    .sendKeys(process.env.PASSPORT_DATE);

  // phone prefix
  await driver
    .findElement(By.xpath(`//*[@id="mat-input-5"]`))
    .sendKeys(process.env.PHONE_PREFIX);

  // phone number
  await driver
    .findElement(By.xpath(`//*[@id="mat-input-6"]`))
    .sendKeys(process.env.PHONE_NUMBER);

  // email
  return await driver
    .findElement(By.xpath(`//*[@id="mat-input-7"]`))
    .sendKeys(process.env.EMAIL);
};
