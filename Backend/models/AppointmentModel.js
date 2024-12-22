import mongoose from "mongoose";
import Counter from "../utils/counter.js";

const appointmentSchema = new mongoose.Schema({
    userId: {type: Number, required: true, unique: true},
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

appointmentModel.addAppointment = async function (appointmentData, successCallback, errorCallback) {
    try {
        // Generate a new bookingId
        const { sequenceValue: bookingId } = await Counter.findByIdAndUpdate(
            { _id: "bookingId" },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );
        
        appointmentData.bookingId = bookingId;
        const result = await this.insertOne(appointmentData);

        successCallback(result);
    } catch (error) {
        errorCallback(error);
    }
};
export default appointmentModel;