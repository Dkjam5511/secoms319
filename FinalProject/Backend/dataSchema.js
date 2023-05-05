const mongoose = require("mongoose");
const ReactFormDataSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String },
    favorite: { type: Boolean },
    image: { type: String },
    data: {type: [Number]},
},
    { collection: "stocks" }
);
const Stock = mongoose.model("Stock", ReactFormDataSchema);
module.exports = Stock;
