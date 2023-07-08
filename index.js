import "chromedriver";
import { config } from "dotenv";
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import {
  getRandomIp,
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
import { PageLoadStrategy } from "selenium-webdriver/lib/capabilities.js";
import { postBot } from "./telegram.js";
import SeleniumStealth from "selenium-stealth";

let quit = true;
config();

const PROXIES = [
  "185.15.172.212:3128",
  "109.195.230.143:8080",
  "217.175.39.90:8080",
  "145.255.30.241:8088",
];

const PROXIES_RU = ["45.130.69.73:8000"];
// 47.251.48.42:8888

const errorNotificationText = "Please try again in another 2 hours";
const PAGE_TIMEOUT = 30000;

async function launchSelenium() {
  // getting random ip
  // const proxy = await getRandomIp();
  const proxy = "45.130.69.73:8000";
  //
  console.log(`Launching Browser instance over proxy: ${proxy}`);
  // set up browser
  const options = await new chrome.Options();
  await options.addArguments("start-maximized");
  // await options.excludeSwitches([
  //   "enable-automation",
  //   "useAutomationExtension",
  // ]);
  // await options.addArguments("--disable-blink-features=AutomationControlled");
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
  // await options.setPageLoadStrategy(PageLoadStrategy.EAGER);

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  // const seleniumStealth = new SeleniumStealth(driver);
  //
  // await seleniumStealth.stealth({
  //   languages: ["en-US", "en"],
  //   vendor: "Google Inc.",
  //   platform: "Win32",
  //   webglVendor: "Intel Inc.",
  //   renderer: "Intel Iris OpenGL Engine",
  //   fixHairline: true,
  // });
  // await driver.manage().deleteAllCookies();

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
    quit = false;

    await review(driver);
  } catch (err) {
    console.error(err);
    if (quit) {
      driver.quit();
      await sleep(5000);

      await launchSelenium();
    }
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
