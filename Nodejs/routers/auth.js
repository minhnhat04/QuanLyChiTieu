import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../model/User.js";

const router = express.Router();

router.post("/PageLogin", async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Số điện thoại hoặc mật khẩu không chính xác" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Số điện thoại hoặc mật khẩu không chính xác" });
    }

    const token = jwt.sign({ userId: user._id, phone: user.phone }, "win", {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Đăng nhập thành công",
      user: { phone: user.phone, role: user.role, name: user.name },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
});

router.post("/PageRegister", async (req, res) => {
  const { name, phone, role, password } = req.body;
  
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: "Số điện thoại phải đủ 10 số" });
  }
  
  try {
    const checkUser = await User.findOne({ phone });
    if (checkUser) {
      return res.status(400).json({ message: "Số điện thoại đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      role,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi", error });
  }
});

export default router;
