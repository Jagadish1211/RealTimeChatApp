const mongoose = require('mongoose');

Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    messages: [{type: Schema.Types.ObjectId, ref: "Message"}],
});

module.exports = mongoose.model("Conversation", ConversationSchema);

