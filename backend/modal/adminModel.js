const { mongoose } = require("mongoose");
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }, 
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "admin",
    },
});

const User = mongoose.model("admin", adminSchema);
module.exports = User;
