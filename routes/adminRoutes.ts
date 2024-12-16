import { Router } from "express";
import { login } from "../controllers/authController";
import { signup } from "../controllers/authController";
import { authorize } from "../middleware/authorize";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);

// Protected route requiring "manage_users" permission
router.get("/dashboard", authorize(["manage_users"]), (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});

export default router;
