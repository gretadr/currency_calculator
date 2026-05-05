import express from "express";
import cors from "cors";
import db from "./db.js";

//Importing Routes
import authRoutes from "./routes/auth.js";
import currenciesRoutes from "./routes/currencies.js";
import convertCurrencies from "./routes/convert.js";

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Routes

app.use("/api/auth", authRoutes);

app.use("/api/currencies", currenciesRoutes);

app.use("/api/convert", convertCurrencies);

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});