import { telegramPayment } from "../services/telegram-payment.js";
import { sleep } from "../utils/helpers.js";

export const payment = async (driver) => {
  console.log("Start payment");

  await sleep(5000);

  await telegramPayment(driver);
};
