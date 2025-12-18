import express, { Request, Response } from "express"
import { BookingController } from "./booking.controller"
import auth from "../../middleware/auth"

const routes = express()

routes.post("/", BookingController.createBooking)

routes.get("/",auth("admin","user"), BookingController.getAllBookings)

export const BookingRoute = routes