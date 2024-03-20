export const generateRandomPassword = () => {
  const randomString = Math.random().toString(36).slice(-8);
  return randomString;
};
