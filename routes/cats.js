var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var CatModel = require("../models/CatModel.js");

// Read data
router.get("/", function (req, res, next) {
      CatModel.find(function (err, theCats) {
            if (err) return next(err);
            else {
                  res.json(theCats);
            }
      });
});

// Create data
router.post("/", function (req, res, next) {
      CatModel.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
      });
});

// Update data
router.post("/:id", function (req, res, next) {
      CatModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
      });
});

// Delete data
router.delete("/:id", function (req, res, next) {
      CatModel.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
      });
});

module.exports = router;
