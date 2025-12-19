import express from "express"
import { vehicleController } from "./vehicle.controller"
import auth from "../../middleware/auth"

const routes = express()

routes.post("/",auth("admin") ,vehicleController.addVehicle)

routes.get("/", vehicleController.getVehicles) /* public */

routes.get("/:id", vehicleController.singleVehicle) /* public */

routes.put("/:id", auth("admin"),vehicleController.updateVehicle)

routes.delete("/:id",auth("admin"),vehicleController.deleteVehicle)

export const vehicleRoute = routes