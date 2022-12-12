const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const {Chats} = require("../models/chats.model");

const getChats = async () => {
    const all = await Chats.find({});
    return all;
};

const chatByName = async (name) => {
    const found = await Chats.findOne(name);
    if(found == null)
        throw new ApiError(httpStatus.NOT_FOUND, "user not found");
    return found;
};

const newChat = async (payload) => {
    const data = new Chats(payload);
    const saved = await data.save();
    return saved;
};

const updateChats = async (payload) => {
    const name = payload.name;
    const {message} = payload;
    const chat = await chatByName({name});
    const oldMessage = chat.message;
    chat.message = [];
    chat.message = [...oldMessage,...message];
    const saved = await chat.save();
    return saved;
};

const deleteUser = async (name) => {
    // Chats.collection.drop();
    const found = await chatByName(name);
    found.name = ""
    found.message = []
    await found.save()
    await Chats.findOneAndRemove({name: ""})

};

module.exports = {
    getChats,
    chatByName,
    newChat,
    updateChats,
    deleteUser
};
