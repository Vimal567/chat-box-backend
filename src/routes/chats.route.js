const express = require("express");
const { getChats, chatByName, newChat, deleteUser } = require("../controllers/chats.controller");
const router = express.Router();

router.get("/", getChats);
router.get("/:name", chatByName);
router.post("/", newChat);
router.delete("/:name", deleteUser);

module.exports = router;
