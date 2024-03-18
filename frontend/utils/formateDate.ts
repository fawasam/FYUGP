export const formateDate = (mongoDate: string): string => {
  const date: Date = new Date(mongoDate);
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const year: string = String(date.getFullYear()).slice(2);
  return `${day}/${month}/${year}`;
};
