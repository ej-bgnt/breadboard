import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import calcRoutes from "./routes/calcRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("Req method: " + req.method + " @ Req location: " + req.url);
  next();
});
app.use("/api/calculate", calcRoutes);

app.listen(PORT, () => {
  console.log("Server in running on port " + PORT);
});
