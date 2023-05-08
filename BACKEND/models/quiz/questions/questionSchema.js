const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
            minLength:[5, 'question must be at least 5 character long']
        }
    }
)