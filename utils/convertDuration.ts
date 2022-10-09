export const convertDuration = (duration: number) => {
  const ss = 60000;

  const minutes = Math.floor(duration / ss);
  const seconds = ((duration % ss) / 1000).toFixed(0);

  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
};
