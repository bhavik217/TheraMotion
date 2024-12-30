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

// Helper function to convert 12-hour time to 24-hour format
function convertTo24Hour(timeStr) {
    const [time, period] = timeStr.toLowerCase().split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'pm' && hours !== 12) {
        hours += 12;
    } else if (period === 'am' && hours === 12) {
        hours = 0;
    }
    
    return { hours, minutes };
}

// Helper function to get current IST datetime
function getCurrentISTDateTime() {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (UTC+5:30)
    return new Date(now.getTime() + istOffset);
}

// Helper function to create a consistent IST date-time object
function createISTBookingDateTime(date, timeStr) {
    // Create date object from the appointment date
    const bookingDate = new Date(date);
    
    // Convert the time string to 24-hour format
    const { hours, minutes } = convertTo24Hour(timeStr);
    
    // Set the time components for IST
    const istDateTime = new Date(bookingDate);
    istDateTime.setHours(hours, minutes, 0, 0);
    
    return istDateTime;
}

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

appointmentModel.getUserBookings = async function(type, req, successCallback, errorCallback){
    const reqMail = req?.params?.email;

    try {
        // Get current IST date-time
        const currentISTDateTime = getCurrentISTDateTime();
        console.log('Current IST DateTime:', currentISTDateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));

        const dbRes = await appointmentModel.find({ email: reqMail });

        if(!dbRes || dbRes.length === 0){
            return errorCallback({status: 404, message: "Bookings not found"});
        }

        if(type === "current"){
            const currentBookings = dbRes.filter((booking) => {
                const bookingISTDateTime = createISTBookingDateTime(
                    booking.appointmentDetails.date,
                    booking.appointmentDetails.time
                );

                console.log('Comparing booking:', {
                    date: booking.appointmentDetails.date,
                    time: booking.appointmentDetails.time,
                    bookingDateTime: bookingISTDateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                    currentDateTime: currentISTDateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                    isCurrent: bookingISTDateTime >= currentISTDateTime
                });

                return bookingISTDateTime >= currentISTDateTime;
            });
            
            console.log(`Found ${currentBookings.length} current bookings`);
            successCallback(currentBookings);
        }
        else if(type === "previous"){
            const previousBookings = dbRes.filter((booking) => {
                const bookingISTDateTime = createISTBookingDateTime(
                    booking.appointmentDetails.date,
                    booking.appointmentDetails.time
                );

                console.log('Comparing booking:', {
                    date: booking.appointmentDetails.date,
                    time: booking.appointmentDetails.time,
                    bookingDateTime: bookingISTDateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                    currentDateTime: currentISTDateTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                    isPrevious: bookingISTDateTime < currentISTDateTime
                });

                return bookingISTDateTime < currentISTDateTime;
            });
            
            console.log(`Found ${previousBookings.length} previous bookings`);
            successCallback(previousBookings);
        }
        else {
            errorCallback({status: 400, message: "Invalid booking type"});
        }
    } catch (error) {
        console.error("GET | dbErr is: ", error.message);
        errorCallback({status: 500, message: "Database error"});
    }
}

export default appointmentModel;