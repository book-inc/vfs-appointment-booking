import axios from "axios";
import { config } from "dotenv";

config();

const URL_PAID = `http://list.didsoft.com/get?email=${process.env.PROXY_API_USERNAME}&pass=${process.env.PROXY_API_PASSWORD}&pid=http1000&showcountry=no&country=RU&https=yes`;
const URL =
  "https://api.asocks.com/api/v1/proxy-list/E-tqqb4HwWXE3ItRVoD1Ihm4Mjse9DKi.txt?type=4&country=RU";

export const getProxyList = async () => {
  const response = await axios.get(URL_PAID);

  console.log(response.data);
  return response.data.split("\n").filter((e) => !!e);
};
