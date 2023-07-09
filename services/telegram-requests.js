import axios from "axios";

export async function postBot(msg = "_") {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_ID}/sendMessage`;

  const params = {
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text: msg,
  };

  axios
    .get(url, { params })
    .then(function (response) {
      if (response?.data) {
        console.log(response.data.result);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
