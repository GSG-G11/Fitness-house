import { Request } from 'express';

export interface GymFilter {
  gymName?: object;
  city?: object;
  typeGender?: object;
  monthlyPrice?: object;
  fulltime?: object;
  features?: object;
}

export interface authRequest extends Request {
  token?: {
    id: string;
    name: string;
    role: string;
  };
}

export interface paramsType {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ACL: string;
  ContentEncoding: string;
  ContentType: string;
}
