import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import clinicRoutes from "./modules/clinic/clinic.routes.js";
import patientsRoutes from "./modules/patient/patient.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/clinic", clinicRoutes);
app.use("/patients", patientsRoutes);

app.get("/", (req, res) => {
  res.send("Clinia API OK");
});

export default app;
