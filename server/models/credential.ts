import * as mongoose from 'mongoose';

const credentialSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  password: String,
  domain: { type: String, required: true, trim: true },
  creator: { type: String, required: true, trim: true }
});

const Credential = mongoose.model('Credential', credentialSchema);

export default Credential;
