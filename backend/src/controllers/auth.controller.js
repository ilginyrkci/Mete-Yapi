import { registerUser, loginUser } from "../services/auth.service.js";

export async function registerController(req, res) {
  const result = await registerUser(req.body);
  res.status(201).json(result);
}

export async function loginController(req, res) {
  const result = await loginUser(req.body);
  res.json(result);
}

export async function meController(req, res) {
  res.json({ user: req.user });
}
