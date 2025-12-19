import { pool } from "../../config/db";

const addVehicle = async (vehicle_name: string, type: string,registration_number:string, daily_rent_price:number,availability_status:string) => {
    const result = await pool.query(
      `INSERT INTO vehicle(vehicle_name, type, registration_number, daily_rent_price,availability_status) VALUES ($1,$2,$3,$4,$5) RETURNING id, vehicle_name,type,registration_number,daily_rent_price,availability_status`,
      [vehicle_name, type,registration_number, daily_rent_price,availability_status]
    );
    return result
}
                                                          
const getVehicles = async () => {
const result = await pool.query(`SELECT * FROM vehicle`)
return result
}

const singleVehicle = async (id :string) => {
    const result =await pool.query(`SELECT * FROM vehicle WHERE id=$1`, [id]);
    return result
}

const updateVehicle =async (vehicle_name :string, type:string, registration_number:string, daily_rent_price:string,availability_status:string, id: string) => {
    const result = await pool.query(
      `UPDATE vehicle SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4,availability_status=$5 WHERE id=$6 RETURNING *`,
      [vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,id]
    );
    return result
} 

const deleteVehicle = async (id :string) => {
   const vehicle = await pool.query(`SELECT availability_status FROM vehicle WHERE id=$1`,[id])

    if (vehicle.rowCount === 0){
    throw new Error ("vahicle not found")
   }
    
   const status = vehicle.rows[0].availability_status
   
   if (status === "booked"){
     throw new Error ("Vehicle is booked. Cannot delete")
   }
   const deleteResult = await pool.query(`DELETE FROM vehicle WHERE id=$1`,[id])
   
   return deleteResult
}

export const vehicleService = {
    addVehicle,
    getVehicles,
    singleVehicle,
    updateVehicle,
    deleteVehicle
}