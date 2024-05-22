import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (inputPassword: string, passwordDb: string) => {
  return bcrypt.compareSync(inputPassword, passwordDb);
};
