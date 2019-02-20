const mongoose = require('mongoose');
const { Schema } = mongoose;

console.log('inside ConfigdataSchemaModel');

const ConfigdataSchema = new Schema({
  configType: String,
  operatorID: String,
  tableName: String,
  paramName: String,
  domain:String,
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Configdata', ConfigdataSchema);
