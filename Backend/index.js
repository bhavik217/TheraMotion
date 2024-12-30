import express from "express";
import userRoutes from "./routes/user.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import appointmentRoutes from "./routes/appointment.js";
import Counter from "./utils/counter.js";
import path from 'path';


dotenv.config();

const app = express();
const port = "8081";

const initializeCounter = async () => {
    try {
        const counter = await Counter.findById("bookingId");
        if (!counter) {
            await Counter.create({ _id: "bookingId", sequenceValue: 1 });
            console.log("Counter initialized for bookingId.");
        }
    } catch (error) {
        console.error("Error initializing counter:", error);
    }
};

app.use(express.json());

app.use("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, PUT, POST, DELETE, OPTIONS"
    );
    next();
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./../frontend/dist", "index.html"));
});

app.get("/", (req, res) => {
    res.send("hello world again");
});
app.use("/user", userRoutes);
app.use("/appointment", appointmentRoutes);


connectDB()
    .then(() => {
        // Initialize counter after DB connection
        initializeCounter();

        // Start the server
        app.listen(port, () => {
            console.log("The server is running on port: ", port);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });