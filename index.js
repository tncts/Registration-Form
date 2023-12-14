const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const bodyParser = require("body-parser"); 
//used to make the complex data readable that comes from client to server
const dotenv = require("dotenv"); //dotenv is used to hide the username password of mongoDB
const uri = 'mongodb+srv://${username}:${password}@clustertnct.dvbdkp1.mongodb.net/registrationFormDB';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const punycode = require('punycode');
const punycodeEncodedUsername = punycode.encode(username);
const punycodeEncodedPassword = punycode.encode(password);
mongoose.connect(`mongodb+srv://${username}:${password}@clustertnct.dvbdkp1.mongodb.net/registrationFormDB` , {
    useNewUrlParser: true,
    const :client = new MongoClient(uri, { useNewUrlParser: true })
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB:', error));

// Registration Schema
const RegistrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

// Model of Registration Schema
const Registration = mongoose.model("Registration", RegistrationSchema);
app.use(bodyParser.urlencoded ({extended : true}));
app.use(bodyParser.json());


app.get("/" , (req,res) => {
    res.sendFile(__dirname + "/pages/index.html");
})


app.post("/register" , async (req,res) => {
    try{
        const {name , email , password} = req.body;

        const  registrationData = new Registration({
            name,
            email,
            password
        });
        await registrationData.save();
        res.redirect("/success");

    }
    catch (error){
        console.log(error);
        res.redirect("error");
    }
})

app.get("/success" , (req,res)=>{
    res.sendFile (__dirname + "/pages/success.html");
})
app.get("/error" , (req,res)=>{
    res.sendFile (__dirname + "/pages/error.html");



app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})

})
