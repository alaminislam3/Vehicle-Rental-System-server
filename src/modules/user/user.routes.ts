import express from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const routes = express()

routes.post("/auth/signup",userController.createUser)

routes.get("/users", auth("admin"),userController.getUser) 

routes.get("/:id",userController.getSingleUser)

routes.put("/users/:id",auth("admin","customer"),userController.updateUser) 

routes.delete("/users/:id",auth("admin"), userController.deleteUser)

export const UserRoutes = routes