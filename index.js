import "chromedriver";
import { config } from "dotenv";
import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import { waitUntilTextOnPage } from "./utils/helpers.js";
import { startBooking } from "./pages/start-booking.js";
import { appointmentDetails } from "./pages/appointment-details.js";
import { login } from "./pages/login.js";
import { yourDetails } from "./pages/your-details.js";
import cron from "node-cron";
import { Type } from "selenium-webdriver/lib/proxy.js";
import { bookAppointment } from "./pages/book-appointment.js";
import { services } from "./pages/services.js";
import { insurance } from "./pages/insurance.js";
import { review } from "./pages/review.js";

config();

const errorNotificationText = "Please try again in another 2 hours";

const PROXIES = ["http://19.151.94.248:88", "https://154.209.253.83:8443"];

async function launchSelenium() {
  console.log("Launching Browser instance...");

  const seleniumwireOptions = {
    proxyType: Type.MANUAL,
    ftpProxy: "bypass",
    httpProxy: PROXIES[0],
    sslProxy: "bypass",
    noProxy: "bypass",
  };

  const options = await new chrome.Options();
  await options.addArguments("start-maximized");
  await options.addArguments(
    "user-data-dir=/Users/sergeybukin/Library/Application Support/Google/Chrome/Profile 3"
  );
  await options.addArguments("--profile-directory=Profile 3");
  // await options.addArguments(`--proxy-server=http://${PROXIES[0]}`);
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to Url
    await driver.get(process.env.WEBSITE_URL);

    // wait for all elements presented, including 2Captcha solver
    await waitUntilTextOnPage("Solve with 2Captcha", driver);

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
