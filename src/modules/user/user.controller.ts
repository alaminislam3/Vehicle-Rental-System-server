import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser =async (req: Request, res: Response ) => {
 try {
    const result =await userService.createUser(req.body)
    res.status(201).json({
      success: true,
      message: "user registered successfully",
      data: result.rows[0]
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser(req.params.id as string)
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getSingleUser = async(req: Request, res: Response) => {
  try {
    const result = await userService.singleGetUser(req.params.id as string)

    if(result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "data not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Data fatched successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const updateUser = async (req: Request, res: Response) => {
  const {name,email,phone,role} =req.body;
  try {
    const result = await userService.updateUser(name,email,phone,role,req.params.id as string)

    if (result.rows.length === 0){
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Data updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result =await userService.deleteUser(req.params.id as string)

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "data not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user deleted successfully",
        
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export const userController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}
