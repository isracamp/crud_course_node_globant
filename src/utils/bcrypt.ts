import bcrypt from 'bcrypt';
export const bcryptHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

export const bcryptComparePassword = async (password: string, dbPassword: string) =>
  await bcrypt.compare(password, dbPassword);
