import express from "express"
import { vehicleController } from "./vehicle.controller"


const routes = express()

routes.post("/vehicles", vehicleController.addVehicle)

routes.get("/vehicles", vehicleController.getVehicles)

routes.get("/vehicles/:id" , vehicleController.singleVehicle)

routes.put("/vehicles/:id" , vehicleController.updateVehicle)

routes.delete("/vehicles/:id" , vehicleController.deleteVehicle)

export const vehicleRoute = routes