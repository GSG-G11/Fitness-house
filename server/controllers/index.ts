import { getTopGyms, searchGymByName, getFilteredGyms, addReview } from './gyms';
import { getGym, editGymData, postImage, deleteImageController } from './gym';

import { gymRegister, gymLogin, forgetPassword, resetPassword } from './auth';
import { addSubscription, updateStatusSubscription, getSubscription } from './subscription';

export {
  getTopGyms,
  searchGymByName,
  getGym,
  getFilteredGyms,
  gymLogin,
  gymRegister,
  postImage,
  deleteImageController,
  editGymData,
  addSubscription,
  getSubscription,
  updateStatusSubscription,
  addReview,
  forgetPassword,
  resetPassword,
};
