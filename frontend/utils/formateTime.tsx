export function formatedTime(timestamp: any) {
  console.log(timestamp);
  const createdAtDate: any = new Date(timestamp);
  const now: any = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = now - createdAtDate;
  console.log(timeDifference);

  // Convert milliseconds to seconds, minutes, hours, and days
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  let formattedTime;

  if (daysDifference > 0) {
    formattedTime = `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
  } else if (hoursDifference > 0) {
    formattedTime = `${hoursDifference} hour${
      hoursDifference > 1 ? "s" : ""
    } ago`;
  } else if (minutesDifference > 0) {
    formattedTime = `${minutesDifference} minute${
      minutesDifference > 1 ? "s" : ""
    } ago`;
  } else {
    formattedTime = "just now";
  }

  return formattedTime;
}
