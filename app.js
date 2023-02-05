const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const mongoUrl = "mongodb+srv://manoj:manoj@cluster0.owisi19.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl,{
  useNewUrlParser : true,
}).then (() => {
  console.log("connected to the database"); 
})
.catch((e) => {
  console.log(e);
});

require("./UserDetails")
// making the register api
const User = mongoose.model("UserInfo");
app.post("/register", async(req, res) => {
  const {fname, lname, email, password} = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const OldUser = await User.findOne({email})
    if(OldUser){
      return res.send({error : "User Exists"});
    }
    await User.create({
      fname,
      lname, 
      email, 
      password : encryptedPassword,
    });
    res.send({status : "ok"});
  } catch (error) {
    res.send({status : "error"});
  }
});
app.listen(3001,() => {
  console.log("server connected!");
});

