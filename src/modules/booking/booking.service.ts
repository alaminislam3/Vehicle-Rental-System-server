import { pool } from "../../config/db";

/* helper: date format */
const formatDate = (date: string | Date) => {
  return new Date(date).toISOString().split("T")[0];
};

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  /* 1. get vehicle info */
  const vehicleResult = await pool.query(
    `SELECT vehicle_name, daily_rent_price
     FROM vehicle
     WHERE id = $1`,
    [vehicle_id]
  );
  
  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];
  //  console.log(vehicle)
  /* 2. calculate days */
  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);

  const days =
    (endDate.getTime() - startDate.getTime()) /
    (1000 * 60 * 60 * 24);

  if (days <= 0) {
    throw new Error("Invalid rent date range");
  }

  /* 3. calculate price */
  const total_price = days * Number(vehicle.daily_rent_price);

  /* 4. insert booking */
  const bookingResult = await pool.query(
    `INSERT INTO booking
     (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, 'active')
     RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price
    ]
  );

  const booking = bookingResult.rows[0];
  // console.log(booking)
  /* 5. final formatted response */
  return {
    ...booking,
    rent_start_date: formatDate(booking.rent_start_date),
    rent_end_date: formatDate(booking.rent_end_date),
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price
    }
  };
};

const getBookings = async (role: string, email: string) => {
  // ADMIN: all bookings
  if (role === "admin") {
    const result = await pool.query(`
      SELECT
        b.id,
        b.customer_id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,
        json_build_object(
          'name', u.name,
          'email', u.email
        ) AS customer,
        json_build_object(
          'vehicle_name', v.vehicle_name,
          'registration_number', v.registration_number
        ) AS vehicle
      FROM booking b
      JOIN users u ON b.customer_id = u.id
      JOIN vehicle v ON b.vehicle_id = v.id
      ORDER BY b.id DESC
    `);

    return result.rows;
  }

  // CUSTOMER: own bookings
  const result = await pool.query(`
    SELECT
      b.id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,
      json_build_object(
        'vehicle_name', v.vehicle_name,
        'registration_number', v.registration_number,
        'type', v.type
      ) AS vehicle
    FROM booking b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicle v ON b.vehicle_id = v.id
    WHERE u.email = $1
    ORDER BY b.id DESC
  `, [email]);

  return result.rows;
};


export const BookingService = {
  createBooking,
  getBookings
};
