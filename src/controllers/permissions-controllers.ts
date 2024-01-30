import { RequestHandler } from "express";
import { createPermission } from "../repositories/permission-repository";

export const assignPermission: RequestHandler = async (req, res, next) => {

    const { roleId } = req.params;

    const { name, permittedDataNames } = req.body;

    const permissionData = await createPermission(Number(roleId), name, permittedDataNames);

    res.status(201).json({ message: 'Permission created.', permissionData });

};
