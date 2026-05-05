import express from "express";
import db from "../db.js";

const router = express.Router();

//Convert currency Endpoint
router.get("/", async (req, res) => {
    try {
        const { from, to, amount } = req.query;
        //res.json({from, to, amount});

        //Validate required fields
        if (!from || !to || !amount) {
            return res.status(400).json({ error: "All fields required."});
        }

        const numAmount = Number(amount);

        //Validate amount
        if (isNaN(numAmount) || numAmount <= 0 ) {
            return res.status(400).json({ error: "Invalid amount value"});
        } 
        const fromCurrency = from.toUpperCase();
        const toCurrency = to.toUpperCase();

        //GET exchange rate from db
        const findCurrency = await db.query("SELECT rate FROM exchange_rates WHERE from_currency = $1 AND to_currency =$2 ", [fromCurrency,toCurrency]);
        if (findCurrency.rows.length === 0 ) {
            return res.status(404).json({ error: "Exchange rate not found"});
        }
        // console.log(findCurrency.rows); 

        //Calculate converted amount
        const rate = findCurrency.rows[0].rate;

        const result = numAmount *rate;

        return res.status(200).json({
            from: fromCurrency,
            to: toCurrency,
            amount: numAmount,
            rate,
            result
        });
        
    } catch (err) {
       console.error(err);
       res.status(500).json({ error: "Server error" }); 
    }
});

export default router;