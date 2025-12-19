import { Pool } from "pg";
import config from ".";

// DB
export const pool = new Pool({
  connectionString: config.connection_str,
});

/* Create Table  */
const initDB = async () => {
  await pool.query(`
          CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(250) NOT NULL,
          email VARCHAR(150) UNIQUE NOT NULL,
          password TEXT NOT NULL CHECK (length(password) >= 6),
          phone VARCHAR(15) NOT NULL,
          role VARCHAR(50) NOT NULL
         )
         `);
  // console.log("database connected");

  await pool.query(`
     CREATE TABLE IF NOT EXISTS vehicle(
     id SERIAL PRIMARY KEY,
     vehicle_name VARCHAR(250) NOT NULL,
     type VARCHAR(200),
     registration_number VARCHAR(200) UNIQUE NOT NULL,
     daily_rent_price INTEGER NOT NULL CHECK (daily_rent_price > 0),
     availability_status VARCHAR(50)
     )
     `);
   await pool.query(`
     CREATE TABLE IF NOT EXISTS booking(
     id SERIAL PRIMARY KEY,
     customer_id INT REFERENCES users(id) ON DELETE CASCADE,
     vehicle_id	INT REFERENCES vehicle(id) ON DELETE CASCADE,
     rent_start_date DATE NOT NULL,
     rent_end_date DATE NOT NULL,
     CHECK (rent_end_date > rent_start_date),
     total_price INTEGER NOT NULL CHECK (total_price > 0),
     status VARCHAR(200)
    )   
    `)
};
    // user_id INT REFERENCES users(id) ON DELETE CASCADE, for link
     
export default initDB;
