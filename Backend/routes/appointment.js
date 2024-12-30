import express, { json } from "express";
import AppointmentModel from "../models/AppointmentModel.js";

const router = express.Router();

// POST request to create an appointment
router.post("/", (req, res) => {
    // Method to add new appointment
    AppointmentModel.addAppointment(
        req.body,
        (dbRes) => {
            if (dbRes) {
                res.send(dbRes);
            } else {
                res.status(400);
                res.send(dbRes);
            }
        },
        (dbError) => {
            console.log(dbError.name);
            if (dbError.name === "ValidationError") {
                res.status(400);
            } else {
                res.status(500);
            }
            res.send({ error: dbError.message });
        }
    );
});

router.get("/:email/current", (req, res) => {
    AppointmentModel.getUserBookings(
        "current",
        req, 
        (dbres) => {
            res.status(200).json(dbres)
        },
        (dbErr) => {
            res.status(dbErr.status || 500).json({ error: dbErr.message });
        }
    )
});

router.get("/:email/previous", (req, res) => {
    AppointmentModel.getUserBookings(
        "previous",
        req, 
        (dbres) => {
            res.status(200).json(dbres)
        },
        (dbErr) => {
            res.status(dbErr.status || 500).json({ error: dbErr.message });
        }
    )
});
export default router;
