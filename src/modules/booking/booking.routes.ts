import express, { Request, Response } from "express"
import { BookingController } from "./booking.controller"

const routes = express()

routes.post("/bookings", BookingController.createBooking)

export const BookingRoute = routes