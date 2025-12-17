import express from "express"
import { authControl } from "./auth.controller"

const routes = express()

routes.post("/signin", authControl.loginUser)



export const authRoutes = routes