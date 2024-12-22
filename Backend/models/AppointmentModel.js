import mongoose from "mongoose";
import Counter from "../utils/counter.js";

const appointmentSchema = new mongoose.Schema({
    bookingId: {type: Number, required: true, unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    comments: { type: String },

    appointmentDetails: {
        practitioner: { type: String, required: true },
        service: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
    },
}, { timestamps: true });

const appointmentModel = mongoose.model("AppointmentModel", appointmentSchema);

appointmentModel.addAppointment = async function (
    appointmentData,
    successCallback,
    errorCallback
) {
    try {
        // Fetch the next bookingId from the counter
        const counter = await Counter.findByIdAndUpdate(
            { _id: "bookingId" },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true } // Create counter if it doesn't exist
        );
        const nextBookingId = counter.sequenceValue;

        // Add the bookingId to the appointment data
        appointmentData.bookingId = nextBookingId;

        // Create a new instance of the Appointment model
        const newAppointment = new this(appointmentData);

        // Save the appointment to the database
        const savedAppointment = await newAppointment.save();

        successCallback(savedAppointment);
    } catch (error) {
        errorCallback(error);
    }
};
export default appointmentModel;
