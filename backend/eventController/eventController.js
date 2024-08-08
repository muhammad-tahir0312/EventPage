const express = require("express");
const EventModel = require("../Models/EventModel");
const router = express.Router();

router.route("/register").post(async (req, res) => {
    const { title, description, date, location, attendees } = req.body;
    if (!title || !description || !date) {
        res.status(400).json({ message: "Fields are missing" });
    }

    // Convert the date string to a Date object
    const [day, month, year] = date.split('-').map(Number);
    const dateObject = new Date(year, month - 1, day); // Month is 0-indexed

    // Ensure the date is in ISO format
    const isoDate = dateObject.toISOString();

    const checkEvent = await EventModel.findOne({ title });

    if (checkEvent) {
        res.status(500).json({ message: "Event already exsits" });
    }

    const register = await EventModel.create({ title: title, description: description, date: isoDate, location: location, attendees: attendees });

    if (!register) {
        res.status(500);
        throw new Error("Failed to register user");
    } else {
        res.status(200).json({ id: register.id, title: register.title });
    }
})

router.route("/:id").delete(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID is missing" });
    }

    const useravailable = await EventModel.findOne({ _id: id });
    if (!useravailable) {
        return res.status(400).json({ message: "Event does not exist" });
    }

    const checkDelete = await EventModel.deleteOne({ _id: id });

    if (checkDelete.deletedCount === 0) {
        return res.status(500).json({ message: "Failed to delete event" });
    } else {
        return res.status(200).json({ message: `${useravailable.title} Deleted Successfully` });
    }
});

router.route("/").get(async (req, res) => {
    const allEvents = await EventModel.find();
    if (allEvents) {
        res.status(200).json(allEvents);
    } else {
        res.status(404).json({ message: "No event exists" });
    }
});

router.route("/:id").get(async (req, res) => {
    const {id} = req.params;
    const Event = await EventModel.find({ _id:id });
    if (Event) {
        res.status(200).json(Event);
    } else {
        res.status(404).json({ message: "No event exists" });
    }
});

router.route("/:id").put(async (req, res) => {
    const { id } = req.params;
    const { title, description, date, location, attendees } = req.body;

    if (!title || !description || !date) {
        res.status(400).json({ message: "Fields are missing" });
    }
    // Convert the date string to a Date object
    const [day, month, year] = date.split('-').map(Number);
    const dateObject = new Date(year, month - 1, day); // Month is 0-indexed

    // Ensure the date is in ISO format
    const isoDate = dateObject.toISOString();

    const updated = await EventModel.findOneAndUpdate({ title: title, description: description, date: isoDate, location: location, attendees: attendees });
    if (!updated) {
        res.status(500);
        throw new Error("Failed to update event");
    } else {
        res.status(200).json({ message: ` ${title} Updated Successfully` });
    }
})

module.exports = router;