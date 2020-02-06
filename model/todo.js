const mongoose = require("mongoose");

const schemaContent = new mongoose.Schema(
    {
        item: {
            type: String,
            required: true
        }
    }
)


const Todo = mongoose.model("Todo", schemaContent)

module.exports = Todo