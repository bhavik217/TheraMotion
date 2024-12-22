import express from "express";
import UserModel from "../models/UserModel.js";
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
    UserModel.addUser(
        req.body,
        (dbRes) => {
            res.status(201).json(dbRes);
        },
        (dbErr) => {
            res.status(dbErr.status || 500).json({ error: dbErr.message });
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