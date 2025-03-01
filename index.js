const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./Config/DBConfig")
const path = 5000 || process.env.PATH;
const cors = require('cors');

app.use(express.json()); // Increase JSON payload size
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Increase URL-encoded data limit
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
connection();



app.use("/api/user", require("./Routes/UserRoutes"));
app.use("/api/hotel", require("./Routes/HotelRoutes"));
app.use("/api/bookHotel", require("./Routes/BookedHotel"));
app.use("/api/rooms", require("./Routes/RoomRoutes"));
app.use("/api/payment", require("./Routes/PaymentRoutes"));
app.listen(path , ()=>{
    console.log(`Server is running at ${path}`);
    
})