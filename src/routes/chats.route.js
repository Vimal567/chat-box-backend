const express = require("express");
const chatsController = require("../controllers/chats.controller");

const router = express.Router();

router.get("/", chatsController.getChats);
router.get("/:name", chatsController.chatByName);
router.post("/", chatsController.newChat);
router.patch("/", chatsController.updateChats);
router.delete("/:name", chatsController.deleteUser);

module.exports = router;