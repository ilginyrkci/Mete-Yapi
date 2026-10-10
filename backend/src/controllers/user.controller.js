import { listUsers, updateUserRole, updateProfile } from "../services/user.service.js";

export async function getUsersController(req, res) {
  const users = await listUsers();
  res.json(users);
}

export async function updateRoleController(req, res) {
  const user = await updateUserRole(req.params.id, req.body.role);
  res.json(user);
}

export async function updateProfileController(req, res) {
  const user = await updateProfile(req.user.id, req.body);
  res.json(user);
}
