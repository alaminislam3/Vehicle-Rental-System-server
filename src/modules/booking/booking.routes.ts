import express, { Request, Response } from "express"
import { BookingController } from "./booking.controller"
import auth from "../../middleware/auth"

const routes = express()

routes.post("/",auth("admin", "cutomer") ,BookingController.createBooking)

routes.get("/",auth("admin","customer"), BookingController.getAllBookings) /* role based */

routes.put("/:id",auth("admin","customer"),BookingController.updateBooking)  
 /* Role-based	Customer: Cancel booking (before start date only)
Admin: Mark as "returned" (updates vehicle to "available")
System: Auto-mark as "returned" when period ends
 */

export const BookingRoute = routes