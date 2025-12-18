import express from "express"
import { vehicleController } from "./vehicle.controller"
import auth from "../../middleware/auth"


const routes = express()

routes.post("/", vehicleController.addVehicle)

routes.get("/",auth("admin", "customer"), vehicleController.getVehicles)

routes.get("/:id" , vehicleController.singleVehicle)

routes.put("/:id" , vehicleController.updateVehicle)

routes.delete("/:id" , vehicleController.deleteVehicle)

export const vehicleRoute = routes