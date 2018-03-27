import Credential from '../models/credential';
import BaseCtrl from './base';

export default class CredentialCtrl extends BaseCtrl {
  model = Credential;

  // Get Credentials By Domain By User
  GetCredentialsByDomainUser = (req, res) => {
    this.model.find({ creator: req.params.userdomain.split("-")[0], domain: req.params.userdomain.split("-")[1]  }, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }
	
}
