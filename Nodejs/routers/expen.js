import express from "express";
import Expen from "../model/Expen.js";
import Category from "../model/Category.js";
import Income from "../model/Income.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/PageAddChiTieu', async (req, res) => {
  const { nameExpen, priceExpen, dateExpen, contenExpen, categoryId, incomeId } = req.body;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, 'win');
    const userId = decoded.userId;

    const newExpen = new Expen({
      nameExpen,
      priceExpen,
      dateExpen,
      contenExpen,
      userId,
      categoryId,
      incomeId
    });

    await newExpen.save();
    res.status(201).json({ message: 'Đã thêm chi tiêu', expen: newExpen });
  } catch (error) {
    console.error('Error adding expense:', error.message); // Log chi tiết lỗi
    res.status(500).json({ message: 'Đã xảy ra lỗi', error: error.message });
  }
});


router.get("/PageListChiTieu", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "win");
    const userId = decoded.userId;

    const expens = await Expen.find({ userId });
    res.json(expens);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
});

router.delete("/PageDeleteChiTieu/:id", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const expenId = req.params.id;

  console.log("Token:", token);
  console.log("Expen ID:", expenId);

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "win");
    const userId = decoded.userId;

    console.log("User ID from token:", userId);

    const expen = await Expen.findOne({ _id: expenId, userId });

    if (!expen)
      return res
        .status(404)
        .json({
          message: "Chi tiêu không tồn tại hoặc không thuộc về người dùng này",
        });

    await Expen.deleteOne({ _id: expenId });
    res.status(200).json({ message: "Chi tiêu đã được xóa thành công" });
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
});

// Category Expen

router.post("/PageAddDmCt", async (req, res) => {
  const { nameCategory, moneyCategory } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "win");
    const userId = decoded.userId;

    const newCategory = new Category({
      nameCategory,
      moneyCategory,
      userId,
    });

    await newCategory.save();

    res
      .status(201)
      .json({ message: "Đã thêm danh mục", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
});

router.get("/PageAddChiTieu", async (req, res) => {
  try {

    const categories = await Category.find();
    const incomes = await Income.find();

    res.status(200).json({
      categories,
      incomes
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/PageListDmCt", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "win");
    const userId = decoded.userId;

    const catogerys = await Category.find({ userId });
    res.json(catogerys);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
});


// All Income

router.post("/PageAddIncome", async (req, res) => {
  const { nameIncome, moneyIncome, dateIncome } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "win");
    const userId = decoded.userId;

    const newIncome = new Income({
      nameIncome,
      moneyIncome,
      dateIncome,
      userId,
    });

    await newIncome.save();

    res
      .status(201)
      .json({ message: "Đã thêm thu nhập", income: newIncome });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
});

router.get("/PageTongChiTieu", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "win");
    const userId = decoded.userId;

    const incomes = await Income.find({ userId });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
});

export default router;
