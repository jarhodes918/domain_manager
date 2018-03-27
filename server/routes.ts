import * as express from 'express';

import DomainCtrl from './controllers/domain';
import CredentialCtrl from './controllers/credential';
import UserCtrl from './controllers/user';
import Domain from './models/domain';
import Credential from './models/credential';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const domainCtrl = new DomainCtrl();
  const credentialCtrl = new CredentialCtrl();
  const userCtrl = new UserCtrl();

  // Domain
  router.route('/domains').get(domainCtrl.getAll);
  router.route('/domains/count').get(domainCtrl.count);
  router.route('/domain').post(domainCtrl.insert);
  router.route('/domain/:id').get(domainCtrl.get);
  router.route('/domain/:id').put(domainCtrl.update);
  router.route('/domain/:id').delete(domainCtrl.delete);
  router.route('/domains/:user').get(domainCtrl.GetDomainsByUser);
  router.route('/domain/delete/:userdomain').delete(domainCtrl.DeleteDomainByUser);
  router.route('/domain/get/:userdomain').get(domainCtrl.GetDomainByUser);

  // Credential
  router.route('/credentials').get(credentialCtrl.getAll);
  router.route('/credentials/count').get(credentialCtrl.count);
  router.route('/credential').post(credentialCtrl.insert);
  router.route('/credential/:id').get(credentialCtrl.get);
  router.route('/credential/:id').put(credentialCtrl.update);
  router.route('/credential/:id').delete(credentialCtrl.delete);
  router.route('/credentials/:userdomain').get(credentialCtrl.GetCredentialsByDomainUser);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Set parameter
  //app.param('user',domainCtrl.DomainByUser);

  // Set parameter
  //app.param('userdomain',credentialCtrl.CredentialsByDomainUser);
  
  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
