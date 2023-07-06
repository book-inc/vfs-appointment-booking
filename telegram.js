import axios from "axios";

export async function postBot(msg = "_") {
  const url = `https://api.telegram.org/${process.env.TELEGRAM_BOT_ID}/sendMessage`;

  const params = {
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text: msg,
  };

  axios
    .get(url, { params })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
