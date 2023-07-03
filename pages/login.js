import { By } from "selenium-webdriver";
import { sleep, waitUntilTextInElement } from "../utils/helpers.js";

export const login = async (driver) => {
  await driver.findElement(By.id("mat-input-0")).sendKeys(process.env.EMAIL);
  await driver.findElement(By.id("mat-input-1")).sendKeys(process.env.PASSWORD);

  const captchaSolver = await driver.findElement(
    By.xpath(
      "/html/body/app-root/div/app-login/section/div/div/mat-card/form/app-captcha-container/div/div[2]"
    )
  );
  await captchaSolver.click();
  console.log("wait for captchaSolver");
  await waitUntilTextInElement(captchaSolver, "solved", driver);
  console.log("captcha solved");

  // need to wait captcha solved result to be passed
  await sleep(2000);

  console.log("clicked login");
  return await driver.findElement(By.className("mat-btn-lg")).click();
};
