export const generateRandomPassword: any = () => {
  const randomString = Math.random().toString(36).slice(-8);
  return randomString;
};
