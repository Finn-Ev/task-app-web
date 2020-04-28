export const formatStringToDate = dateString => {
  const dateArray = dateString.split('.');
  const formattedDate = new Date(
    +dateArray[2],
    dateArray[1] - 1,
    +dateArray[0]
  );
  return formattedDate;
};
