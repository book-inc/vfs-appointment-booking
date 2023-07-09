import fs from "fs";

export const isNumberInString = (str) => !!str.match(/\d+/);

export function getRandomArbitrary(min, max) {
  const random = Math.round(Math.random() * (max - min) + min);
  return random >= max ? max : random;
}

export const takeScreenshot = async (driver, file) => {
  return await driver.takeScreenshot().then((image) =>
    fs.writeFile(file, image, "base64", function (err) {
      console.log(err);
    })
  );
};
