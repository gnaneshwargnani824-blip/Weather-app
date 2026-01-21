import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/weather", async (req, res) => {
    const location = req.query.q;
    const API_KEY = process.env.WEATHER_API_KEY;

    if (!location) {
        return res.status(400).json({ error: "Location is required" });
    }

    try {
        const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
