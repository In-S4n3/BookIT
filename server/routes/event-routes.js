const express = require("express");
const router = express.Router();

const Event = require("../models/Event-model");

router.post("/events", (req, res, next) => {
  const { name, date, hour, restaurantName, restaurantAddress } = req.body;
  Event.create({
    name,
    date,
    hour,
    restaurantName,
    restaurantAddress,
    //owner
  })
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

router.get("/events", (req, res, next) => {
  Event.find()
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

// GET route => obter um event em particular
router.get("/events/:id", (req, res, next) => {
  const { id } = req.params;
  Event.findById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// PUT route => obter um event em particular
router.put("/events/:id", (req, res, next) => {
  const { id } = req.params;
  Event.findByIdAndUpdate(id, req.body)
    .then((response) => {
      res.status(200).json({
        message: `Even with ${req.params.id} ==> ${response} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// DELETE route => to delete a specific event
router.delete("/events/:id", (req, res, next) => {
  Event.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Event with ${req.params.id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.json(error);
    });
});


module.exports = router;