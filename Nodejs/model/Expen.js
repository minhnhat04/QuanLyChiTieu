import mongoose from 'mongoose';

const userExpenSchema = new mongoose.Schema({
  nameExpen: String,
  priceExpen: Number,
  dateExpen: Date,
  contenExpen: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  incomeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Income',
    required: true
  }
});


const Expen = mongoose.model('Expen', userExpenSchema);

export default Expen;
