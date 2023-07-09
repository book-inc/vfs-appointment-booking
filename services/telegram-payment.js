import TelegramBot from "node-telegram-bot-api";
import { By } from "selenium-webdriver";
import {
  findElementByText,
  getParent,
  sleep,
  waitUntilTextOnPage,
  waitUtilElement,
} from "../utils/helpers.js";
import { sendScreenshot } from "./send-screenshot.js";

const cvcCatch = async (bot, driver, msg) => {
  await driver
    .findElement(
      By.xpath(
        "/html/body/div[1]/main/section[4]/form[2]/div[1]/div[2]/div/input[2]"
      )
    )
    .sendKeys(Number(process.env.CARD_NUMBER));

  // fill card month
  await driver
    .findElement(
      By.xpath(
        `/html/body/div[1]/main/section[4]/form[2]/div[2]/div[2]/div[1]/select`
      )
    )
    .click();
  const monthOption = await findElementByText(process.env.CARD_MONTH, driver);
  await monthOption.click();

  // fill card year
  await driver
    .findElement(
      By.xpath(
        `/html/body/div[1]/main/section[4]/form[2]/div[2]/div[2]/div[2]/select`
      )
    )
    .click();
  const yearOption = await findElementByText(process.env.CARD_YEAR, driver);
  await yearOption.click();

  // fill cardholder
  await driver
    .findElement(
      By.xpath(
        "/html/body/div[1]/main/section[4]/form[2]/div[3]/div[2]/div/input"
      )
    )
    .sendKeys(process.env.CARD_HOLDER);

  // fill email
  await driver.executeScript(
    `document.getElementById('email').value='${process.env.EMAIL}'`
  );

  // fill phone
  await driver.executeScript(
    `document.getElementById('phone').value='${process.env.PHONE_NUMBER_WITH_PREFIX}'`
  );

  // fill cvc2
  await driver
    .findElement(
      By.xpath(
        "/html/body/div[1]/main/section[4]/form[2]/div[4]/div[2]/div/input"
      )
    )
    .sendKeys(Number(msg.text));

  // confirm payment
  await driver
    .findElement(
      By.xpath(`/html/body/div[1]/main/section[4]/div[9]/div[1]/button`)
    )
    .click();

  await waitUtilElement(driver, By.tagName("input"), 20000);

  const chatId = msg.chat.id;

  return await bot.sendMessage(chatId, "Please, send received code");
};

export const telegramPayment = async (driver) => {
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_ID, { polling: true });
  await bot.sendMessage(
    process.env.TELEGRAM_CHAT_ID,
    "To proceed the payment, please send your card CVC2 code"
  );

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, "Received your message");

    const now = new Date().getTime() / 1000 - 2;
    const isNewMessage = msg.date > now;

    if (msg.text.length === 3 && isNewMessage) {
      await cvcCatch(bot, driver, msg);
    }

    if (msg.text.length > 3 && isNewMessage) {
      // security code
      await driver
        .findElement(By.xpath("/html/body/main/form/label/input"))
        .sendKeys(Number(msg.text));

      await sleep(3000);
      await sendScreenshot(driver, "successfully.png");
      await bot.sendMessage(
        chatId,
        "Your appointment have been successfully booked!"
      );

      await driver.quit();
    }
  });

  await sleep(900000);
};
