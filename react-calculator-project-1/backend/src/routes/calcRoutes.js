import express from "express";
import { calcInput, calcResult } from "../controllers/calcControllers.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hello would." });
});

router.post("/", calcInput);
router.post("/result", calcResult);

export default router;
