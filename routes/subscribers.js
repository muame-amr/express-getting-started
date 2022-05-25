const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

const getSubscriber = async (req, res, next) => {
	await Subscriber.findById(req.params.id)
		.then((subs) => {
			res.subscriber = subs;
			if (subs == null)
				return res.status(404).json({ message: "Subscriber not found" });
		})
		.catch((err) => {
			return res.status(500).json({ message: err.message });
		});
	next();
};

router.get("/", async (req, res) => {
	await Subscriber.find()
		.then((subs) => res.status(200).json(subs))
		.catch((err) => res.status(500).json({ message: err.message }));
});

router.get("/:id", getSubscriber, (req, res) => {
	res.json(res.subscriber);
});

router.post("/", async (req, res) => {
	await new Subscriber({
		name: req.body.name,
		subscribed: req.body.subscribed,
	})
		.save()
		.then((subs) => res.status(201).json(subs))
		.catch((err) => res.status(400).json({ message: err.message }));
});

router.patch("/:id", getSubscriber, async (req, res) => {
	if (req.body.name != null) res.subscriber.name = req.body.name;
	if (req.body.subscribed != null)
		res.subscriber.subscribed = req.body.subscribed;

	await res.subscriber
		.save()
		.then((subs) => res.status(200).json(subs))
		.catch((err) => res.status(400).json({ message: err.message }));
});

router.delete("/:id", getSubscriber, async (req, res) => {
	await res.subscriber
		.remove()
		.then((subs) => res.json({ message: "Subscriber deleted" }))
		.catch((err) => res.status(500).json({ message: err.message }));
});

module.exports = router;
