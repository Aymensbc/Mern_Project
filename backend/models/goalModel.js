// Here we define our schema which is the field for a particular resource

const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add text value"], //we can either set this to true or we can add an array and set to true plus a message
    },
  },
  {
    timestamps: true, //this will automatcially create updated at and created at field
  }
);

//Once we have defined schema , then we need to craete a model for that schema
module.exports = mongoose.model("Goal", goalSchema); // this a function wwhich takes in the name of teh model. For.eg in the database this will be a Goal Collection.
// the next argument is schema .
