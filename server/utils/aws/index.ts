import AWS from 'aws-sdk';
import { paramsType, propsDeleteType } from '../types';

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = process.env;
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const uploadImage = (image: string) => {
  const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const type = image.split(';')[0].split('/')[1];

  const params: paramsType = {
    Bucket: `${AWS_BUCKET_NAME}`,
    Key: `gyms/${new Date().getTime()}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };
  return s3.upload(params).promise();
};

const deleteImage = (image: string) => {
  const Key = image.split('https://fitness-house.s3.eu-west-2.amazonaws.com/')[1];
  const params: propsDeleteType = {
    Bucket: `${AWS_BUCKET_NAME}`,
    Key,
  };
  console.log(Key);
  return s3.deleteObject(params).promise();
};

export { uploadImage, deleteImage };
