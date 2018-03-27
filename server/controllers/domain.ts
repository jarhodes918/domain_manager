import Domain from '../models/domain';
import BaseCtrl from './base';

export default class DomainCtrl extends BaseCtrl {
  model = Domain;

   // Get Domains By User
  GetDomainsByUser = (req, res) => {
    this.model.find({ creator: req.params.user }, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }
  // Get id of one domain by user
  GetDomainByUser = (req, res) => {
    this.model.findOne({ creator: req.params.userdomain.split("-")[0], name: req.params.userdomain.split("-")[1] }, (err, item) => {
      if (err) { return console.error(err); }
		return res.status(200).json(item);
    });
  }

  DeleteDomainByUser = (req, res) => {
    this.model.remove({ creator: req.params.userdomain.split("-")[0], name: req.params.userdomain.split("-")[1] }, (err) => {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }

}
