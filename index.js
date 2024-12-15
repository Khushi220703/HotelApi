const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./Config/DBConfig")
const path = 5000 || process.env.PATH;
const cors = require('cors');

app.use(express.json());

connection();

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE',"PATCH"], 
    credentials: true,
  }));

app.use("/api/user", require("./Routes/UserRoutes"));
app.use("/api/hotel", require("./Routes/HotelRoutes"));
app.use("/api/bookHotel", require("./Routes/BookedHotel"));
app.use("/api/rooms", require("./Routes/RoomRoutes"));
app.use("/api/payment", require("./Routes/PaymentRoutes"));
app.listen(path , ()=>{
    console.log(`Server is running at ${path}`);
    
})