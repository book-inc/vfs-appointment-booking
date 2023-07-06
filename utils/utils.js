export const isNumberInString = (str) => !!str.match(/\d+/);

export function getRandomArbitrary(min, max) {
  const random = Math.round(Math.random() * (max - min) + min);
  return random >= max ? max : random;
}
