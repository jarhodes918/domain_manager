import * as mongoose from 'mongoose';

const domainSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  creator: { type: String, required: true, trim: true }
});

const Domain = mongoose.model('Domain', domainSchema);

export default Domain;
