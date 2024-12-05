import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    comments: { type: String },
    marketing: { type: Boolean, default: false },

    appointmentDetails: {
        practitioner: { type: String, required: true },
        service: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
    },
});

const appointmentModel = mongoose.model("AppointmentModel", appointmentSchema);

appointmentModel.addAppointment = async function (appointmentData, successCallback, errorCallback) {
    try {
        // Create a new instance of the Appointment model
        const newAppointment = new this(appointmentData);

        // Save the appointment to the database
        const savedAppointment = await newAppointment.save();

        successCallback(savedAppointment);
    }
    catch (error) {
        errorCallback(error);
    }
};
export default appointmentModel;