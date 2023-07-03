import "chromedriver";
import { config } from "dotenv";

import Client from "@infosimples/node_two_captcha";
import { Builder, By, Key, until } from "selenium-webdriver";

config();

// const client = new Client(process.env.CAPTCHA_API_KEY, {
//   timeout: 60000,
//   polling: 5000,
//   throwErrors: false,
// });

// const initiateCaptchaRequest = async () => {
//   console.log("solving captcha...");
//   try {
//     client
//       .decodeRecaptchaV2({
//         googlekey: process.env.GOOGLE_CAPTCHA_KEY,
//         pageurl: process.env.WEBSITE_URL,
//       })
//       .then(function (response) {
//         //   if captcha is solved, launch selenium driver.
//         launchSelenium(response);
//       });
//   } finally {
//     //   do something
//   }
// };

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function launchSelenium(response) {
  if (response) {
    console.log("Captcha Solved! Launching Browser instance...");

    let driver = await new Builder().forBrowser("chrome").build();
    const client = new Client(process.env.CAPTCHA_API_KEY);

    // Navigate to Url
    await driver.get(process.env.WEBSITE_URL);

    await sleep(8000);
    // await driver.findElement(By.id("mat-input-0")).sendKeys("book_inc@mail.ru");
    // await driver.findElement(By.id("mat-input-1")).sendKeys("Serbuk@1995");

    // const gCaptchResponseInput = await driver.findElement(
    //   By.id("g-recaptcha-response")
    // );
    //
    // await driver.executeScript(
    //   "arguments[0].setAttribute('style','type: text; visibility:visible;');",
    //   gCaptchResponseInput
    // );
    //
    // const gCaptchResponseInput_new = await driver.findElement(
    //   By.id("g-recaptcha-response")
    // );
    //
    // await gCaptchResponseInput_new.sendKeys(`${response.text}`);
    //
    // await driver.executeScript(
    //   "arguments[0].setAttribute('style','display:none;');",
    //   gCaptchResponseInput_new
    // );
    //
    // const captchaFrame = await driver.findElement(
    //   By.xpath(
    //     "/html/body/app-root/div/app-login/section/div/div/mat-card/form/app-captcha-container/div/div/div/iframe"
    //   )
    // );
    // await driver.switchTo().frame(captchaFrame);
    //
    // await driver.executeScript(
    //   "document.getElementById('recaptcha-anchor').setAttribute('aria-checked','true');"
    // );

    // await driver.executeScript("console.log(1212, form)");

    // const captchaCheckbox = await driver.findElement(By.id("recaptcha-anchor"));

    // await captchaCheckbox.click();

    // await driver.switchTo().defaultContent();

    // wait
    //   .until(
    //     ExpectedConditions.element_to_be_clickable(
    //       (By.CSS_SELECTOR, ".g-recaptcha > div > div.captcha-solver")
    //     )
    //   )
    //   .click();
    // driver.wait.until(
    //   ExpectedConditions.text_to_be_present_in_element_attribute(
    //     (By.CSS_SELECTOR, ".g-recaptcha > div > div.captcha-solver"),
    //     "data-state",
    //     "solved"
    //   )
    // );

    // const captchaSolver = await driver.findElement(
    //   By.xpath(
    //     "/html/body/app-root/div/app-login/section/div/div/mat-card/form/app-captcha-container/div/div[2]"
    //   )
    // );
    // await captchaSolver.click();
    //
    // await driver.wait(function () {
    //   return captchaSolver.getAttribute("data-state") === "solved";
    // }, 100);
    //
    // await driver.findElement(By.className("mat-btn-lg")).click();

    // wait 8 seconds and close browser window
    await sleep(10000);

    const html = await driver.getPageSource();

    // console.log(html);
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
