const mongoose = require('mongoose')

Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email should be provided"],
        unique: [true," Email already exists"],
        trim: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message : "Please enter a valid email address"
    }
    },
    password: {
        type: String,
        required: [true, "Password should be provided"],
    },
    contacts: [],
    profileImage: {type: String, default: ""},
    conversations: [{type: Schema.Types.ObjectId, ref: "Message"}]
});


module.exports = mongoose.model("User", userSchema);