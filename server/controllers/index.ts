import { getTopGyms, searchGymByName, getFilteredGyms, addReview } from './gyms';
import { getGym, editGymData, postImage, deleteImageController, getSubscription } from './gym';
import { gymRegister, gymLogin } from './auth';
import addSubscription from './subscription';

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
  addReview,
};
