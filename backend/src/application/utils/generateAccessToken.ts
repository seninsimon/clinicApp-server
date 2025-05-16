    import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string, role: string) => {
  if (!process.env.SECRET_KEY) throw new Error('SECRET_KEY environment variable is not set');
  return jwt.sign({ sub: userId, role }, process.env.SECRET_KEY, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
  if (!process.env.REFRESH_SECRET_KEY) throw new Error('REFRESH_SECRET_KEY environment variable is not set');
  return jwt.sign({ sub: userId }, process.env.REFRESH_SECRET_KEY, { expiresIn: "7d" });
};

// Verify tokens
export const verifyAccessToken = (token: string) => {
  if (!process.env.SECRET_KEY) throw new Error('SECRET_KEY environment variable is not set');
  return jwt.verify(token, process.env.SECRET_KEY);
};

export const verifyRefreshToken = (token: string) => {
  if (!process.env.REFRESH_SECRET_KEY) throw new Error('REFRESH_SECRET_KEY environment variable is not set');
  return jwt.verify(token, process.env.REFRESH_SECRET_KEY);
};