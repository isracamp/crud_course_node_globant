/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

export const generateJWT = (input: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { input };
    jwt.sign(
      payload,
      `${process.env.SECRET_KEY}`,
      {
        expiresIn: '2190h',
      },
      (err, token) => {
        if (!token) {
          return;
        }
        if (err) {
          reject('not generated token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const verifyJWT = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, `${process.env.SECRET_KEY}`, (err, tokenVerify) => {
      if (err) {
        reject('cant save the token');
      } else {
        resolve(tokenVerify);
      }
    });
  });
};
