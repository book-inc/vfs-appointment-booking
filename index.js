import "chromedriver";
import { config } from "dotenv";
import { Builder, By, Key, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import {
  sleep,
  waitUntilTextInElement,
  waitUntilTextOnPage,
} from "./utils/helpers.js";
import { startBooking } from "./pages/start-booking.js";
import { appointmentDetails } from "./pages/appointment-details.js";

config();

async function launchSelenium(response) {
  if (response) {
    console.log("Launching Browser instance...");

    const options = await new chrome.Options();
    await options.addArguments("start-maximized");
    await options.addArguments(
      "user-data-dir=/Users/sergeybukin/Library/Application Support/Google/Chrome/Profile 3"
    );
    await options.addArguments("--profile-directory=Profile 3");
    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    // Navigate to Url
    await driver.get(process.env.WEBSITE_URL);

    // wait for all elements presented, including 2Captcha solver
    await waitUntilTextOnPage("Solve with 2Captcha", driver);
    const isError = await waitUntilTextOnPage("Solve with 2Captcha", driver);

    // Solve with 2Captcha
    await driver.findElement(By.id("mat-input-0")).sendKeys("book_inc@mail.ru");
    await driver.findElement(By.id("mat-input-1")).sendKeys("Serbuk@1995");

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

    await driver.findElement(By.className("mat-btn-lg")).click();
    console.log("clicked login");

    await startBooking(driver);

    await appointmentDetails(driver);

    // driver.quit();
  } else {
    //   if no text return request time out message
    console.log("Request timed out.");
  }
}

(async function main() {
  await launchSelenium(true);
  // const response = await initiateCaptchaRequest();
})();
