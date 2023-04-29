const mongoose = require("mongoose");

Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    message: {
        type: String,
        trim: true
    },
    sender : {
        type: Schema.Types.ObjectId, ref : "User"
    },
    target : {
        type: Schema.Types.ObjectId, ref : "User"
    },
    
}, {timestamps: true})

module.exports  = mongoose.model("Message", MessagesSchema);