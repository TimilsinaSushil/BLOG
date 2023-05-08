const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 character long"],
    maxlength: 20,
  },
});
