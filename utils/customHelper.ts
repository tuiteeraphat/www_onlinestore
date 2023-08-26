export const convertTimeToThailand = (utcTimestamp: any) => {
  return new Date(utcTimestamp).toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
    hour12: false,
  });
};
