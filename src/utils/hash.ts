import bcrypt from "bcrypt";

const saltRounds = 10;

export async function generateHash(passord: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(passord, salt);
  return hash;
}

export async function checkPassword(
  passord: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(passord, hash);
}
