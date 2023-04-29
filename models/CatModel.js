var mongoose = require("mongoose");

var CatScheme = new mongoose.Schema(
      {
            name: String,
            age: String,
            breed: String,
            sex: String,
            DOB: String,
            color: String,
      },
      {
            collection: "katter",
      }
);

module.exports = mongoose.model("CatModel", CatScheme);
