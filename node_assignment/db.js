const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db("social_media");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

module.exports = { connectDB };
