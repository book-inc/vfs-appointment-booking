import axios from "axios";
import { config } from "dotenv";

config();

export const getProxyList = async () => {
  const response = await axios.get(
    `http://list.didsoft.com/get?email=${process.env.PROXY_API_USERNAME}&pass=${process.env.PROXY_API_PASSWORD}&pid=http1000&showcountry=no&country=RU`
  );

  return response.data.split("\n").filter((e) => !!e);
};
