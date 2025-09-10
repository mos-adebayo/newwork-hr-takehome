export const delayPromise = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));
