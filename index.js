import "chromedriver";
import { config } from "dotenv";
import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import {
  findElementByText,
  sleep,
  waitUntilTextOnPage,
} from "./utils/helpers.js";
import { startBooking } from "./pages/start-booking.js";
import { appointmentDetails } from "./pages/appointment-details.js";
import { login } from "./pages/login.js";

config();

const errorNotificationText = "Please try again in another 2 hours";

async function launchSelenium() {
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

  await login(driver);

  await startBooking(driver);

  await appointmentDetails(driver);

  // driver.quit();
}

(async function main() {
  await launchSelenium();
})();
