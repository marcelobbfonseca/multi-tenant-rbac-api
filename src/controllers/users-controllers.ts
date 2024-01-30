import { RequestHandler } from "express";
import { requestToUserMapper } from "../mapper/req-to-user-mapper";
import { userModelToUserMapper } from "../mapper/user-model-to-user-mapper";
import { getUsers as getUsersRepositor, createUser, getUserById, deleteUser, updateUser, getUserByEmail } from "../repositories/user-repository";
import { UserParams } from "../entities/user-entity";
import { signInUseCase } from "../useCases/sign-in-use-case";
import { getTenantByName } from "../repositories/tenant-repository";
import { userValidateTenantUseCase } from "../useCases/user-validate-company-use-case";
import { createUserRole } from "../repositories/role-repository";
import { createRolePermissions } from "../repositories/permission-repository";
import { canAccessUseCase } from "../useCases/access-use-case";



export const createUsers: RequestHandler = async (req, res, next) => {
    //@ts-ignore
    const { authenticatedUser , tenant } = req;
    const canAccess = await canAccessUseCase(authenticatedUser,'user', 'create', tenant);
    if (!canAccess) {
        res.status(403).json({message: 'Forbiden.'});
        return;
    }
    
    const { name, email, password } = req.body;


    const user = requestToUserMapper(req.body);
    
    const userModel = await createUser(user);

    const createdUser = userModelToUserMapper(userModel);

    res.status(201).json({message: 'user created!', user: createdUser});
};

export const getUsers: RequestHandler = async (req, res, next) => {
    
    const users = await getUsersRepositor();
    
    res.status(200).json({ users });
};

export const getUser: RequestHandler = async (req, res, next) => {
    
    const { id } = req.params;
    
    const user = await getUserById(Number(id));

    res.status(200).json({ user });
};

export const updateUsers: RequestHandler = async (req, res, next) => {
    
    const { id } = req.params;

    const params: UserParams = { id, ...req.body };
    
    const user = requestToUserMapper(params);
    
    const updated = await updateUser(user);

    if (updated) res.status(200).json({ message: 'user updated.' });
    else res.status(500).json({error: 'unable to update!'});
};

export const deleteUsers: RequestHandler = async (req, res, next) => {
    
    const { id } = req.params;
    
    const deleted = await deleteUser(Number(id));
    
    if (deleted) res.status(200).json({ message: 'User deleted successfully' });
    else res.status(500).json({error: 'unable to delete!'});
};

export const signInUser: RequestHandler = async (req, res, next) => {
    
    const { tenantName, email, password } = req.body;
    
    const tenantId = await userValidateTenantUseCase(tenantName, email);
    
    if(tenantId === -1){
        res.status(403).json({message: 'Forbbiden.'});
        return;
    } 

    const { accessToken, refreshToken } = await signInUseCase(email, password, tenantId);

    if(!accessToken || !refreshToken) {
        res.status(400).json({message: 'Authentication failed.'});
        return;
    }

    res.status(200).json({message: 'Authenticated.', accessToken });
};

export const signUpUser: RequestHandler = async (req, res, next) => {

    const { name, email, password, tenantName, confirmPassword } = req.body;

    const tenant = await getTenantByName(tenantName);

    if(!tenant) {
        res.status(400).json({message: 'Tenant does not exists.'});
        return;
    }

    if(password !== confirmPassword) {
        res.status(400).json({message: 'Passwords do not match.'});
        return;
    }
    
    const params: UserParams = { email, password, name, superuser: false };
    
    const user = requestToUserMapper(params);
    
    const userModel = await createUser(user);

    const role = await createUserRole(userModel.id, tenant.id);

    await createRolePermissions(role.name, role.id);
    
    res.status(201).json({message: 'Sign up successfully.'});
};
