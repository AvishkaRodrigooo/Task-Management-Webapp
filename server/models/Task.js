const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String, description: String,
  deadline: Date, assignedTo: String,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
