
import { CLOUDINARY } from './constants';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'dh9tbctwa',
      api_key: '275359827789754',
      api_secret: 'cGOgdUzQPRG8GBb9xsdSKcrPpZQ'
    });
  },
};
