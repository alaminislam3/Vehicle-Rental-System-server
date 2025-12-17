import { Request, Response } from "express"
import { BookingService } from "./booking.service"


const createBooking = async (req: Request, res: Response) => {
    // const {customer_id,vehicle_id,rent_start_date,rent_end_date} =req.body
    try{
    const result = await BookingService.createBooking(req.body)    
        res.status(201).json({
            success: true,
            message : "Booking created successfully",
            data : result
        })
    } catch (err: any){
         res.status(500).json({
            success: false,
            message : "Booking failed",
            error : err.message
         })
    }
}



export const BookingController = {
     createBooking
}