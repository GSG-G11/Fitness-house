import Subscription from './subscription';
import Reviews from './reviews';

import Gym from './gyms';
import User from './user';

Subscription.belongsTo(User);
Subscription.belongsTo(Gym);

Reviews.belongsTo(User);
Reviews.belongsTo(Gym);

export {
  Subscription, Reviews,
};
