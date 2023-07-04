import { By } from "selenium-webdriver";
import {
  findElementByText,
  getParent,
  sleep,
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

  // Date of birth
  await driver
    .findElement(By.xpath(`//*[@id="dateOfBirth"]`))
    .sendKeys(process.env.DATE_OF_BIRTH);

  // nationality
  await driver.findElement(By.xpath(`//*[@id="mat-select-8"]`)).click();
  const nationalityOptionSpan = await findElementByText(
    process.env.NATIONALITY,
    driver
  );
  const nationalityOption = await getParent(nationalityOptionSpan, driver);
  // scroll into needed option, otherwise click will be intercepted by overlay
  await driver.executeScript(
    "arguments[0].scrollIntoView(true);",
    nationalityOption
  );
  await nationalityOption.click();

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
  await driver
    .findElement(By.xpath(`//*[@id="mat-input-7"]`))
    .sendKeys(process.env.EMAIL);

  console.log("Need to wait 30secs. It's a restriction by the  website");
  // need to wait 30secs. It's a restriction by the website
  await sleep(30000);

  await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/div/app-applicant-details/section/mat-card[2]/app-dynamic-form/div/div/app-dynamic-control/div/div/div[2]/button"
      )
    )
    .click();
  console.log("Submit your details");

  await waitUntilPageLoadingFinished(driver);

  console.log("Continue to next step");

  return await driver
    .findElement(
      By.xpath(
        "/html/body/app-root/div/app-applicant-details/section/mat-card[2]/div/div[2]/button"
      )
    )
    .click();
};
