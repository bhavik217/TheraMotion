import express from 'express';
import AppointmentModel from '../models/AppointmentModel.js';

const router = express.Router();

// POST request to create an appointment
router.post("/", (req, res) => {
    // Method to add new appointment
    AppointmentModel.addAppointment(
        req.body,
        (dbRes) => {
            if(dbRes){
                res.send(dbRes);
            }
            else{
                res.status(400);
                res.send(dbRes);
            }
        },
        (dbError) => {
            console.log(dbError.name);
            if(dbError.name === "ValidationError"){
                res.status(400);
            }
            else{
                res.status(500);
            }
            res.send({error: dbError.message});
        }
    );
})
export default router;