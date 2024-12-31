import mongoose from "mongoose";
import Counter from "../utils/counter.js";

const appointmentSchema = new mongoose.Schema(
    {
        bookingId: { type: Number, required: true, unique: true },
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
    },
    { timestamps: true }
);

const appointmentModel = mongoose.model("AppointmentModel", appointmentSchema);

// Helper function to convert 12-hour time to minutes since midnight
function timeToMinutes(timeStr) {
    if (!timeStr || typeof timeStr !== "string") {
        throw new Error("Invalid time string");
    }

    const [time, period] = timeStr.toLowerCase().split(" ");
    if (!time || !period || (period !== "am" && period !== "pm")) {
        throw new Error("Time format must be 'hh:mm AM/PM'");
    }

    let [hours, minutes] = time.split(":").map(Number);
    if (
        isNaN(hours) ||
        isNaN(minutes) ||
        hours < 0 ||
        hours > 12 ||
        minutes < 0 ||
        minutes >= 60
    ) {
        throw new Error("Invalid time values");
    }

    if (period === "pm" && hours !== 12) {
        hours += 12;
    } else if (period === "am" && hours === 12) {
        hours = 0;
    }

    return hours * 60 + minutes;
}

// Helper function to get current time in minutes
function getCurrentTimeInMinutes() {
    const now = new Date();
    const istOffset = 5 * 60 + 30;
    const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    const istMinutes = utcMinutes + istOffset;

    return istMinutes % 1440;
}

appointmentModel.addAppointment = async function (
    appointmentData,
    successCallback,
    errorCallback
) {
    try {
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

appointmentModel.getUserBookings = async function (
    type,
    req,
    successCallback,
    errorCallback
) {
    const reqMail = req?.params?.email;

    try {
        const currentDate = new Date();
        // Reset hours to compare just the date
        const currentDateOnly = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );
        const currentTimeMinutes = getCurrentTimeInMinutes();

        console.log("Current date:", currentDateOnly);
        console.log("Current time in minutes:", currentTimeMinutes);

        const dbRes = await appointmentModel.find({ email: reqMail });

        if (!dbRes || dbRes.length === 0) {
            return errorCallback({
                status: 404,
                message: "Bookings not found",
            });
        }

        if (type === "current") {
            const currentBookings = dbRes.filter((booking) => {
                const bookingDate = new Date(booking.appointmentDetails.date);
                const bookingDateOnly = new Date(
                    bookingDate.getFullYear(),
                    bookingDate.getMonth(),
                    bookingDate.getDate()
                );
                const bookingTimeMinutes = timeToMinutes(
                    booking.appointmentDetails.time
                );

                // If booking date is in future, it's a current booking
                if (bookingDateOnly > currentDateOnly) {
                    return true;
                }
                // If it's today, compare times
                if (bookingDateOnly.getTime() === currentDateOnly.getTime()) {
                    return bookingTimeMinutes >= currentTimeMinutes;
                }
                return false;
            });

            successCallback(currentBookings);
        } else if (type === "previous") {
            const previousBookings = dbRes.filter((booking) => {
                const bookingDate = new Date(booking.appointmentDetails.date);
                const bookingDateOnly = new Date(
                    bookingDate.getFullYear(),
                    bookingDate.getMonth(),
                    bookingDate.getDate()
                );
                const bookingTimeMinutes = timeToMinutes(
                    booking.appointmentDetails.time
                );

                // If booking date is in past, it's a previous booking
                if (bookingDateOnly < currentDateOnly) {
                    return true;
                }
                // If it's today, compare times
                if (bookingDateOnly.getTime() === currentDateOnly.getTime()) {
                    return bookingTimeMinutes < currentTimeMinutes;
                }
                return false;
            });

            successCallback(previousBookings);
        } else {
            errorCallback({ status: 400, message: "Invalid booking type" });
        }
    } catch (error) {
        console.error("GET | dbErr is: ", error.message);
        errorCallback({ status: 500, message: "Database error" });
    }
};

export default appointmentModel;
