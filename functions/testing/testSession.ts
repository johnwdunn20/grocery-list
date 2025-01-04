import models from '../src/models/models';

const insertSession = async () => {
  const newSession = await models.Session.create({
    user: '659b830c467947c49d48d568',
    token: '5f5f5f5f5f5f5f5f5f5f5f5f',
  });
}

insertSession();