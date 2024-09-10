import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  nameIncome: String,
  moneyIncome: Number,
  dateIncome: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Income = mongoose.model('Income', incomeSchema);

export default Income;
