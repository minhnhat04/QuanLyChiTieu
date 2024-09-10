import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  nameCategory: String,
  moneyCategory: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
