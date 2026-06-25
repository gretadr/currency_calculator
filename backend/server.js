import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Importing Routes
import authRoutes from "./routes/auth.js";
import currenciesRoutes from "./routes/currencies.js";
import convertCurrencies from "./routes/convert.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Routes

app.use("/api/auth", authRoutes);

app.use("/api/currencies", currenciesRoutes);

app.use("/api/convert", convertCurrencies);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});