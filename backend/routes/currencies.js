import express from "express";
import db from "../db.js";
import authenticateToken from "../middleware.js";

const router = express.Router();

// GET ALL rates
router.get("/", async (req, res) => {
    try {
        const allRates = await db.query("SELECT * FROM exchange_rates ORDER BY from_currency ASC");
        return res.status(200).json(allRates.rows);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error"});
    }
});

//GET a specific rate
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const selectedRate = await db.query("SELECT * FROM exchange_rates WHERE id = $1", [id]);
        
        if (selectedRate.rows.length === 0 ) {
            return res.status(404).json({ error: "The record does not exist." });
        }

        return res.status(200).json(selectedRate.rows[0]);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

//========= PROTECTED ROUTES - REQUIRE AUTHENTICATION ========//

//Create A new rate
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { from_currency, to_currency, rate } = req.body;
        
        //Validate required field
        if (!from_currency || !to_currency || rate ===undefined ) {
            return res.status(400).json({ error: "All fields required."})
        }

        const fromCurrency = from_currency.toUpperCase();
        const toCurrency = to_currency.toUpperCase();

        //Validate rate is a positive number
        const numRate = Number(rate);
        if (isNaN(numRate) || numRate<=0) {
            return res.status(400).json({ error: "Invalid rate value"});
        } 

        const newRate = await db.query("INSERT INTO exchange_rates (from_currency, to_currency, rate) VALUES ($1, $2, $3) RETURNING * ", [fromCurrency, toCurrency, numRate]);
        return res.status(201).json({message: `Rate ${fromCurrency} → ${toCurrency} created successfully. `, data: newRate.rows[0] });
        
    } catch (err) {
        console.error(err);
        //check if pair exists in db
        if (err.code === "23505") {
            return res.status(409).json({ error: "Currency pair already exists."});
        }
        res.status(500).json({ error: "Server error"});
    }
});

//UPDATE a specific exchange rate
router.patch("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { rate } = req.body;

        if (rate === undefined) {
            return res.status(400).json({ error: "Rate is required"});
        }

        const numRate = Number(rate);
        
        //validate rate is a positive number
        if (isNaN(numRate) || numRate <=0) {
            return res.status(400).json( {error: "Invalid rate value."})
        } 
            
        const updateRate = await db.query("UPDATE exchange_rates SET rate=$1 WHERE id=$2 RETURNING *", [numRate, id]);
        if (updateRate.rows.length ===0 ) {
            return res.status(404).json({ error: "Rate not found"});
        }
        return res.status(200).json({ message: "Rate updated successfully ", data: updateRate.rows[0]});
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error"});
    }   
});

//DELETE a specific exchange rate

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteRate = await db.query("DELETE FROM exchange_rates WHERE id=$1 RETURNING *", [id]);

        if (deleteRate.rows.length === 0 ) {
            return res.status(404).json({ error: "Rate not found"})
        }
        return res.status(200).json({ message: "Rate deleted successfully!"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error"});
    }
});

export default router;