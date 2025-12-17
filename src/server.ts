import express, { NextFunction, Request, Response } from "express";
import config from "./config"
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { UserRoutes } from "./modules/user/user.routes";
import { vehicleRoute } from "./modules/vehicle/vehicle.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { BookingRoute } from "./modules/booking/booking.routes";

const app = express();
app.use(express.json());
const port = config.port

// initialize database
initDB();

app.get("/", logger, (req: Request, res: Response)=> {
  res.send("Next level web dev")
})

// USER CRUD
app.use("/api/v1", UserRoutes);

// TODO
app.use("/api/v1", vehicleRoute);

// AUTH 
app.use("/api/v1/auth", authRoutes)

// Booking
app.use("/api/v1", BookingRoute)

// NOT FOUND ROUTE
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
