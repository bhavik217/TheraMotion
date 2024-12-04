import express from "express";
import userRoutes from "./routes/user.js";
import { connectDB } from "./config/db.js";

const app = express();
const port = "8081";

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

app.use("/user",userRoutes);

app.get("/", (req, res) => {
    res.send("hello world again");
});

app.listen(port, () => {
    console.log("The server is running on port: ", port);
});


connectDB();