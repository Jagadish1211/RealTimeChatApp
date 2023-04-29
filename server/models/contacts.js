const mongoose = require('mongoose')

Schema = mongoose.Schema;

const ContactSchema = new Schema({
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
    user : {
        type: Schema.Types.ObjectId, ref : "User"
    }
});

module.exports = mongoose.model("Contact", ContactSchema);