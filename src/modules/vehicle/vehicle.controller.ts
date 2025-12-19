import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const addVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;
  try {
    const result = await vehicleService.addVehicle(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    );

    res.status(201).json({
      success: true,
      message: "vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    
    const result = await vehicleService.getVehicles();
    

    if (result.rows.length === 0) { 
      res.status(200).json({
        success: true,
        message: "No vehicles found",
        data: [],
      });
    } else {
      // "vehicles retrieved successfully",
      res.status(200).json({
        success: true,
        message:  "vehicles retrieved successfully" ,
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const singleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.singleVehicle(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "vehicle retrieved successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const {vehicle_name, type, registration_number, daily_rent_price,availability_status } = req.body;
  try {
    const result = await vehicleService.updateVehicle(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      req.params.id as string
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.deleteVehicle(req.params.id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "data not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
        
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleController = {
  addVehicle,
  getVehicles,
  singleVehicle,
  updateVehicle,
  deleteVehicle
};
