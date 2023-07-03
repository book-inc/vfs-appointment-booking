import fetch from "node-fetch";
const telegram_bot_id = "6303789303:AAHq6HHHhh3YKNmlKvnttiAzPF3_t_eg58o";
const chat_id = "707964910";

async function postData(url = "", data) {
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data, // body data type must match "Content-Type" header
    });
    if (response.error) {
      console.log(1, response.error);
      console.error(2, response.error);
    }

    console.dir(3, response.json());
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (e) {
    console.log(4, e);
    console.error(e);
    return e;
  }
}

export async function postBot(msg = "_") {
  const url = "https://api.telegram.org/" + telegram_bot_id + "/sendMessage";
  const data = {
    chat_id: chat_id,
    text: msg,
  };
  return await postData(url, data);
}
