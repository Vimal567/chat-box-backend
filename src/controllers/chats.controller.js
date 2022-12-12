const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const chatsService = require("../services/chats.service");

const getChats = catchAsync(async (req, res) => {
    const all = await chatsService.getChats();
    res.status(httpStatus.OK).send(all);
});

const chatByName = catchAsync(async (req, res) => {
    const name = req.params;
    const chat = await chatsService.chatByName(name);
    res.status(httpStatus.OK).send(chat);
});

const newChat = catchAsync(async (req, res) => {
    const payload = req.body;
    const posted = await chatsService.newChat(payload);
    res.status(httpStatus.CREATED).send(posted);
});

const updateChats = catchAsync(async (req, res) => {
    const payload = req.body;
    const posted = await chatsService.updateChats(payload);
    res.status(httpStatus.CREATED).send(posted);
});

const deleteUser = catchAsync(async (req, res) => {
    const name = req.params;
    const deleted = await chatsService.deleteUser(name);
    res.status(httpStatus.OK).send(deleted);
});


module.exports = {
  getChats,
  chatByName,
  newChat,
  updateChats,
  deleteUser
};
