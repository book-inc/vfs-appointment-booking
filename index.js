import "chromedriver";
import { config } from "dotenv";
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import { getRandomIp, sleep, waitUntilTextOnPage } from "./utils/helpers.js";
import { startBooking } from "./pages/start-booking.js";
import { appointmentDetails } from "./pages/appointment-details.js";
import { login } from "./pages/login.js";
import { yourDetails } from "./pages/your-details.js";
import { bookAppointment } from "./pages/book-appointment.js";
import { services } from "./pages/services.js";
import { insurance } from "./pages/insurance.js";
import { review } from "./pages/review.js";
import { PageLoadStrategy } from "selenium-webdriver/lib/capabilities.js";

config();

// 178.236.223.250:8080
//   '46.47.197.210:3128#RU',
//   '109.73.5.102:8080#RU',
//   '178.236.223.250:8080#RU',
//   '83.217.16.172:8080#RU'

const errorNotificationText = "Please try again in another 2 hours";
const PAGE_TIMEOUT = 60000;

async function launchSelenium() {
  // getting random ip
  const proxy = await getRandomIp();

  console.log(`Launching Browser instance over proxy: ${proxy}`);
  // set up browser
  const options = await new chrome.Options();
  await options.addArguments("start-maximized");
  // add proxy
  await options.setProxy({
    httpProxy: "178.236.223.250:8080",
    proxyType: "manual",
    sslProxy: "178.236.223.250:8080",
    no_proxy: "",
    ftpProxy: "178.236.223.250:8080",
    class: "org.openqa.selenium.Proxy",
    autodetect: false,
  });
  await options.addArguments(
    "user-data-dir=/Users/sergeybukin/Library/Application Support/Google/Chrome/Profile 3"
  );
  await options.addArguments("--profile-directory=Profile 3");
  // await options.setPageLoadStrategy(PageLoadStrategy.EAGER);

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to Url
    await driver.get(process.env.WEBSITE_URL);

    // wait for all elements presented, including 2Captcha solver
    await waitUntilTextOnPage("Solve with 2Captcha", driver, PAGE_TIMEOUT);

    await login(driver);

    await startBooking(driver);

    await appointmentDetails(driver);

    await yourDetails(driver);

    await bookAppointment(driver);

    await services(driver);

    await insurance(driver);

    await review(driver);
  } catch (err) {
    console.error(err);
    // driver.quit();
    // await sleep(5000);

    // await launchSelenium();
  }
}

(async function main() {
  await launchSelenium();
})();
//
// cron.schedule("* * * * *", async () => {
//   console.log("running a task every minute");
//   await launchSelenium();
// });
