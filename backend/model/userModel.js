const mongoose = require("mongoose")

const Schema = mongoose.Schema;

//create new schema

const userSchema = new Schema({
    fname:{
        type:String,
        require:true
    },

    lname:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },

    password:{
      type:String,
      require:true
    }
})






//create model
const User = mongoose.model("UserInfo",userSchema);

module.exports = User;