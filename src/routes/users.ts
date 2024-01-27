import { Router } from "express";
import { createUsers, updateUsers, getUser, getUsers, deleteUsers, signInUser, signOutUser, signUpUser } from "../controllers/users-controllers";

const router = Router();

router.get('/', getUsers);

router.post('/', createUsers);

router.get('/:id', getUser);

router.put('/:id', updateUsers);

router.delete('/:id', deleteUsers);

router.post('/sign-in', signInUser);

router.get('/sign-out', signOutUser);

router.post('/sign-up', signUpUser);

export default router;
