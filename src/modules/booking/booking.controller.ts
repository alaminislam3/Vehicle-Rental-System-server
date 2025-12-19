import { Request, Response } from "express"
import { BookingService } from "./booking.service"

const createBooking = async (req: Request, res: Response) => {
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

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { role, email } = req.user as {
      role: string;
      email: string;
    };

    const bookings = await BookingService.getBookings(role, email);

    res.status(200).json({
      success: true,
      message:
        role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: bookings,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await BookingService.updateBooking(id as string, status);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // 🔹 Admin returned response
    if (status === "returned") {
      return res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: {
          ...result.booking,
          vehicle: result.vehicle,
        },
      });
    }

    // 🔹 Customer cancelled response
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result.booking,
    });

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};






export const BookingController = {
     createBooking,
     getAllBookings,
     updateBooking
}