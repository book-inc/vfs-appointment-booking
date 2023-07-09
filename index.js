import "chromedriver";
import { config } from "dotenv";
import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import {
  sleep,
  waitUntilPageLoadingFinished,
  waitUntilTextOnPage,
} from "./utils/helpers.js";
import { startBooking } from "./pages/start-booking.js";
import { appointmentDetails } from "./pages/appointment-details.js";
import { login } from "./pages/login.js";
import { yourDetails } from "./pages/your-details.js";
import { bookAppointment } from "./pages/book-appointment.js";
import { services } from "./pages/services.js";
import { insurance } from "./pages/insurance.js";
import { review } from "./pages/review.js";
import { payment } from "./pages/payment.js";
import { postBot } from "./services/telegram-requests.js";
import { sendScreenshot } from "./services/send-screenshot.js";

let readyForPayment = false;
let proxy_count = 0;

config();

const PROXIES_RU = [
  // "45.139.111.234:8000",
  // "45.139.108.225:8000",
  // "45.139.108.49:8000",
  // "45.130.69.73:8000",
  // "45.133.33.5:8000",
  // "193.31.101.237:9241",
  "193.31.102.151:9773",
  "45.139.109.215:8000",
  "193.31.102.100:9247",
  "193.31.100.222:9188",
  "193.31.102.156:9713",
  "193.31.103.42:9858",
  "193.31.100.250:9703",
];

const errorNotificationText = "Please try again in another 2 hours";
const PAGE_TIMEOUT = 20000;

async function launchSelenium() {
  const proxy = PROXIES_RU[proxy_count];
  //
  proxy_count = proxy_count >= PROXIES_RU.length - 1 ? 0 : proxy_count + 1;
  console.log(`Launching Browser instance over proxy: ${proxy}`);
  // set up browser
  const options = await new chrome.Options();
  await options.addArguments("start-maximized");

  // add proxy
  await options.addArguments(`--proxy-server=https://${proxy}`);
  await options.setProxy({
    httpProxy: proxy,
    proxyType: "manual",
    sslProxy: proxy,
    no_proxy: "",
    ftpProxy: proxy,
    class: "org.openqa.selenium.Proxy",
    autodetect: false,
  });
  await options.addArguments(
    "user-data-dir=/Users/sergeybukin/Library/Application Support/Google/Chrome/Profile 3"
  );
  await options.addArguments("--profile-directory=Profile 3");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to Url
    await driver.get(process.env.WEBSITE_URL);
    await waitUntilTextOnPage("Sign in", driver, PAGE_TIMEOUT);

    // wait for all elements presented, including 2Captcha solver
    await waitUntilTextOnPage("Solve with 2Captcha", driver);

    await waitUntilPageLoadingFinished(driver);

    await login(driver);

    await startBooking(driver);

    await appointmentDetails(driver);

    await yourDetails(driver);

    await bookAppointment(driver);

    await services(driver);

    await insurance(driver);

    await review(driver);
    readyForPayment = true;

    await payment(driver);
  } catch (err) {
    console.error(err);
    if (!readyForPayment) {
      driver.quit();
      await sleep(5000);

      await launchSelenium();
    } else {
      await postBot(
        "Sorry, cannot proceed with the payment. Probably at the moment there are no available dates"
      );

      await sendScreenshot(driver, "error.png");

      driver.quit();
      await sleep(5000);

      await launchSelenium();
    }
  }
}

(async function main() {
  await launchSelenium();
})();
