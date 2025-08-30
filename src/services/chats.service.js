const Chats = require("../models/chats.model");
const Users = require("../models/users.model");

const getChats = async () => {
    try {
        const all = await Chats.find({});
        return all;
    } catch (error) {
        throw new Error("Unable to retrieve chats");
    }
};

const chatByName = async (username) => {
    try {
        const found = await Chats.findOne({ username });
        return found;
    } catch (error) {
        throw new Error(error.message || "An error occurred while fetching the chat");
    }
};

const newChat = async (payload) => {
    try {
        const data = new Chats(payload);
        const saved = await data.save();
        return saved;
    } catch (error) {
        throw new Error("Unable to save new chat");
    }
};

const addMessage = async (payload) => {
    try {
        const { username, messageObj } = payload;
        const chat = await chatByName(username);
        const oldMessages = chat.messages;
        chat.messages = [...oldMessages, messageObj];
        const saved = await chat.save();
        return saved;
    } catch (error) {
        throw new Error("Unable to update chat");
    }
};

const updateUsers = async (username) => {
    try {
        // Create a new user document
        const newUser = new Users({ user: username });

        // Save the new user document
        return await newUser.save();
    } catch (error) {
        throw new Error("Unable to update users: " + error.message);
    }
};

const deleteUser = async (username) => {
    try {
        await Users.findOneAndDelete({ user: username });
    } catch (error) {
        throw new Error("Unable to delete user");
    }
};

module.exports = {
    getChats,
    chatByName,
    newChat,
    addMessage,
    updateUsers,
    deleteUser
};
