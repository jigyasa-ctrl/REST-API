//File to create routes
const express = require("express");
const subscriber = require("../models/subscriber");

const router = express.Router();

const Subscriber = require("../models/subscriber");

//getting all subscribers
router.get("/", async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//Getting one subsriber
router.get("/:id", getSubscriber, (req, res) => {
    //colon represents that id is a parameter which acan be passed
    //res.send(req.params.id)
    res.send(res.subscriber);
});


//Creating a subscriber
router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,
    });

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//Updating a suscriber
router.patch("/:id", getSubscriber, async (req, res) => {
    //using patch instead of put because we only want to update whatever the user passes us instead of updating all
    if (req.body.name !== null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel !== null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.json({ message: err.message });
    }
});


//Deleting a suscriber
router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: "Deleted Subscriber" });
    } catch (err) {
        res.json({ message: err.message });
    }
});

async function getSubscriber(req, res, next) {
    try {
        subscribers = await Subscriber.findById(req.params.id);
        if (subscribers == null) {
            return res.status(404).json({ message: "Cannot find subscriber" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.subscriber = subscribers;
    next(); //allows us to move to the next piece of middleware of the request
}
module.exports = router;
