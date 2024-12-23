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

appointmentModel.addAppointment = async function (appointmentData, successCallback, errorCallback) {
    try {
        // Generate a new bookingId
        const { sequenceValue: bookingId } = await Counter.findByIdAndUpdate(
            { _id: "bookingId" },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );
        
        appointmentData.bookingId = bookingId;
        const result = await appointmentModel.insertMany([appointmentData]);

        successCallback(result);
    } catch (error) {
        errorCallback(error);
    }
};

appointmentModel.getUserBookings = async function(req, successCallback, errorCallback){
    const reqMail = req?.params?.email;

    try {
        const dbRes = await appointmentModel.find({email: reqMail});
        if(!dbRes || dbRes.length === 0){
            return errorCallback({status: 404, message: "Bookings not found"});
        }
        successCallback(dbRes);
    } catch (error) {
        console.error("GET | dbErr is: ", error.message);
        errorCallback({status: 500, message: "Database error"});
    }
}
export default appointmentModel;