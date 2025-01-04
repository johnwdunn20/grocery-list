import models from '../src/models/models';

const updateEmailLowerCase = async () => {
  const userData = await models.User.find({}).exec()
  for (let i = 0; i < userData.length; i++) {
    await models.User.findByIdAndUpdate(userData[i]._id, { email: userData[i].email.toLowerCase() }).exec();
  }
}

updateEmailLowerCase();