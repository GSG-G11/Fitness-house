import { verify, sign } from 'jsonwebtoken';

const OPTIONS: object = {
  expiresIn: '30d',
  algorithm: 'HS256',
};
export function checkToken(token: string) {
  return new Promise((resolve, reject) => {
    verify(token, process.env.JWT_SECRET!, (err, payload) => {
      if (err) return reject(err);
      return resolve(payload);
    });
  });
}

export function generateToken(payload: object) {
  return new Promise((resolve, reject) => {
    sign(payload, process.env.JWT_SECRET!, OPTIONS, (err, encodePayload) => {
      if (err) return reject(err);
      return resolve(encodePayload);
    });
  });
}
