import express from "express";
import UserModel from "../models/Usermodel.js";
import { verifyToken } from "../utils/helpers.js";

const router = express.Router();

router.get("/:email", verifyToken, (req, res) => {
    UserModel.getUser(
        req,
        (dbRes) => {
            res.status(200).json(dbRes);
        },
        (dbErr) => {
            res.status(dbErr.status || 500).json({ error: dbErr.message });
        }
    );
});

router.post("/", (req, res) => {
    const user = req.body;

    UserModel.addUser(
        user,
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
                res.status(400); //client side error
            } else {
                res.status(500); //server side error
            }
            res.send({ error: dbError.message });
        }
    );
});
router.post("/signin", (req, res) => {
    UserModel.signIn(
        req.body,
        (dbRes) => {
            res.status(200).json(dbRes);
        },
        (dbErr) => {
            res.status(dbErr.status || 500).json({ error: dbErr.message });
        }
    );
});
export default router;