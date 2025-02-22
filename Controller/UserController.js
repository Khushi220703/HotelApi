const HotelUser = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sendVerification = require("../Mailing/SendMail");
dotenv.config();

const secretkey = process.env.SECRET_KEY;

// Check if email exists in the database
const checkIfEmail = async (email) => {
    const response = await HotelUser.find({ email: email });
    return response.length > 0 ? response : false;  // Returning false if no user found
};

// User Signup Handler
const signupUser = async (req, res) => {
    const { name, email, password, isAdmin, phone, role, address, bookings } = req.body;
   
    
    try {
        // Check if email already exists
        if (!await checkIfEmail(email)) {
            // Hash password before saving
            const hashedPassword = await bcrypt.hash(password.trim(), 10);
           
            
            const newUser = new HotelUser({ name, email, password: hashedPassword, isAdmin, phone, role, address, bookings });
           
            
            // const payload = {
            //     email,
            //     isAdmin
            // };

            // const options = {
            //     expiresIn: "1h", // Token expiry time
            //     algorithm: "HS256" // JWT algorithm (optional, for extra security)
            // };

            // const token = jwt.sign(payload, secretkey, options);
            sendVerification(name,email);
            await newUser.save();
            res.status(201).send({ message: "Successfully added to db." });
        } else {
            res.status(400).send({ message: "The user with this email already exists." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("There is an error from server side of `UserController`.");
    }
};

const verify = async (req,res) =>{
    
    let {token} = req.body;
   
    

        try {
            const decodedToken = jwt.decode(token);
            const email = decodedToken.userEmail;
            const isExits = await HotelUser.findOne({email})
           
            
            if(isExits){
                
                const response = await HotelUser.updateOne(
                    {email: email},
                    {$set: {isVerified:true}}
    
                );
                console.log(response);
                
                
                if (response.matchedCount > 0) {
                    
                    return res.redirect('/');
                } else {
                    return res.status(400).send("Unable to verify the user.");
                }
                
            }
            
            
        } catch (error) {
            console.log(error);
            res.status(500).send("There is an error from server side of `UserController`.");
        }
};

// User Login Handler
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await checkIfEmail(email);

        // If user is found
        if (response) {
            const user = response[0];
            const isAdmin = user.role;

            // Compare the provided password with the hashed password in the database
            const checkPassword = await bcrypt.compare(password.trim(), user.password);
            
            if (checkPassword) {
                const payload = {
                    email,
                    isAdmin
                };

                const options = {
                    expiresIn: "1h", // Token expiry time
                    algorithm: "HS256" // JWT algorithm (optional, for extra security)
                };

                const token = jwt.sign(payload, secretkey, options);
                res.status(200).send({ message: "Logged In", token });
            } else {
                res.status(400).send({ message: "Wrong password!" });
            }
        } else {
            res.status(400).send({ message: "Wrong Email!" });
        }
    } catch (error) {
        console.log("There is an error from server side", error);
        res.status(500).send({ message: "There is an error from server side of `UserController`." });
    }
};

module.exports = { loginUser, signupUser,verify };
