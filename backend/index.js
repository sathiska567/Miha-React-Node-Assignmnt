const express = require('express');

const bodyParser = require("body-parser");

const cors = require("cors");

const mongoose = require("mongoose")

const User = require("./model/userModel")

const TodoRouter = require("./routes/appRoutes")

const TodoModel = require("./model/TodoModel")

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const JWT_SECRET = "djfdfifhuifgrysxklsjdos()ugduegduygfyugfeyuweojdoejdoijf{9wqeuieg;#l"

// ------------------------------------------------------------------------------------------------------------------------------

const app = express();

app.use(express.json())

app.use(express.urlencoded());

app.use(cors());

app.use(bodyParser.json());


const port = 5000;

// -------------------------------------------------------------------------------------------

const mongodbURL = "mongodb+srv://ravishan:Pass123@cluster0.zmi2r0z.mongodb.net/MyDataBase?retryWrites=true&w=majority"

mongoose.connect(mongodbURL,
 { useNewUrlParser:true,
   useUnifiedTopology : true,
}) 

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Mongodb connected");
})

// --------------------------------------------------------------------------------------------------------

app.listen(port,()=>{
    console.log('Server is up and running on port '+ port);
});


// -------------------------------------Register API-------------------------------------------------------

const user = mongoose.model("UserInfo")

app.post("/register",async (req,res)=>{

    const {fname,lname,email,password} = req.body;

    // const encryptedPassword = await bcrypt.hash(password,10)


    try {

        const oldUser = await user.findOne({email})

     if(oldUser){

       return res.send({error:"User Exist"})
     

     }

   // create new user in to mongodb

     await user.create({

        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password:req.body.password,

       });

     res.json({status:"success"});

    } 
    
    catch (error) {
       res.send({status:"error" , error:"Duplicate email"})  
       
    }
})



// --------------------------------------Login API----------------------------------------------------------------------------------

app.post("/login",async(req,res)=>{
  const user = await User.findOne({

     email:req.body.email,
     password: req.body.password,

  })

  if(user){

     const token = jwt.sign({

         name:user.name,
         email:user.email,

     } , 'secret123' )
   


     return res.json({status:"ok",user:token})
  }

  else{
    return res.json({status:"error", user: false})
  }



})


// --------------------------Todo app API---------------------------------


app.post("/users",async(req,res)=>{
  const user = new TodoModel(req.body)

  try {
      await user.save();
      
      res.status(201).send(user)
  } 
  
  catch (error) {

       res.status(400).send(error)
       
  }
})

app.get("/users",async(req,res)=>{
  try {
     const users = await TodoModel.find({})

     res.status(200).send(users)
  } 
  
  catch (error) {
       res.status(400).send(error);
  }
})



app.patch("/users/:id",async(req,res)=>{

  try {
     const userUpdate = await TodoModel.findByIdAndUpdate(req.params.id,req.body,{
       new:true
     })

     if(!userUpdate){
        return res.status(404).send();
     }

     else{
       return res.status(200).send(userUpdate)
     }
  } 
  
  catch (error) {
       res.status(400).send(error);
  }
})




app.delete("/users/:id",async(req,res)=>{
  try {
    const deleteUser = await TodoModel.findByIdAndDelete(req.params.id,req.body,{
      new:true
    })

    if(!deleteUser){
      return res.status(404).send();
    }

     else{
      return res.status(200).send(deleteUser)
     }

  } 
  
  catch (error) {
       res.status(400).send(error);
  }
})





