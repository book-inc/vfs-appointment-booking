import TelegramBot from "node-telegram-bot-api";
import { takeScreenshot } from "../utils/utils.js";
import { sleep } from "../utils/helpers.js";
import fs from "fs";

export const sendScreenshot = async (driver, fileName) => {
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_ID, { polling: true });

  await takeScreenshot(driver, fileName);
  await sleep(3000);

  const buffer = await fs.readFileSync(
    `/Users/sergeybukin/Documents/web-dev/vfs-appointment-booking/${fileName}`
  );

  await bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, buffer);
};
