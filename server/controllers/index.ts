import { getTopGyms, searchGymByName, getFilteredGyms } from './gyms';
import { getGym, editGymData, postImage, deleteImageController } from './gym';
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
};
