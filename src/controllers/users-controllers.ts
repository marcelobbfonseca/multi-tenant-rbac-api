import { RequestHandler } from "express";
import { requestToUserMapper } from "../mapper/req-to-user-mapper";
import { userModelToUserMapper } from "../mapper/user-model-to-user-mapper";
import { getUsers as getUsersRepositor, createUser, getUserById, deleteUser, updateUser } from "../repositories/user-repository";
  

export const createUsers: RequestHandler = async (req, res, next) => {
    
    const user = requestToUserMapper(req.body);
    
    const userModel = await createUser(user);

    const createdUser = userModelToUserMapper(userModel);

    res.status(201).json({message: 'user created!', user: createdUser});
};

export const getUsers: RequestHandler = (req, res, next) => {
    
    const users = getUsersRepositor();
    
    res.status(200).json({ users });
};

export const getUser: RequestHandler = (req, res, next) => {
    const { id } = req.params;
    
    const user = getUserById(Number(id));

    res.status(200).json({ user });
};

export const updateUsers: RequestHandler = async (req, res, next) => {
    const user = requestToUserMapper(req.body);
    
    const updated = await updateUser(user);

    if(updated) res.status(200).json({ message: 'user updated.' });
    
    res.status(500).json({error: 'unable to update!'});
};

export const deleteUsers: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    
    const deleted = await deleteUser(Number(id));
    
    if(deleted) res.status(200).json({ message: 'user deleted.' });

    res.status(500).json({error: 'unable to delete!'});
};

export const signInUser: RequestHandler = (req, res, next) => {
    res.json({message: 'TODO!'});
};

export const signOutUser: RequestHandler = (req, res, next) => {
    res.json({message: 'TODO!'});
};

export const signUpUser: RequestHandler = (req, res, next) => {
    res.json({message: 'TODO!'});
};
