const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minLength:[3, 'Quiz name must be at least 3 character long']
        }
    }
)