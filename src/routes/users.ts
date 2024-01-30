import { Router } from "express";
import { createUsers, updateUsers, getUser, getUsers, deleteUsers } from "../controllers/users-controllers";

const router = Router();

router.get('/', getUsers);

router.post('/', createUsers);

router.get('/:id', getUser);

router.put('/:id', updateUsers);

router.delete('/:id', deleteUsers);

export default router;
