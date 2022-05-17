import { Request } from 'express';
import { Model, InferCreationAttributes, InferAttributes } from 'sequelize';

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

export interface GymModel
  extends Model<InferAttributes<GymModel>, InferCreationAttributes<GymModel>> {
  id?: number;
  gymName: string;
  email: string;
  password: string;
  phone: string;
  description: string;
  sixMonthPrice: number;
  features: string[];
  logo: string;
  city: string | object;
  typeGender: string | object;
  monthlyPrice: number | object;
  fulltime: boolean | object;
}
