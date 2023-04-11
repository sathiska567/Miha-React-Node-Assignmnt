const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema;

//create new schema

const TodoItemSchema = new TodoSchema({
    fname:{
        type:String,
        require:true
    },

})


//create model
const TodoUser = mongoose.model("TodoInfo",TodoItemSchema);

module.exports = TodoUser;