const chatsService = require("../services/chats.service");

const getChats = async () => {
    try {
        const allChats = await chatsService.getChats();
        return allChats;
    } catch (error) {
        res.status(500).send({ message: error.message || "Internal Server Error" });
    }
};

const chatByName = async (username) => {
    try {
        const chat = await chatsService.chatByName(username);
        return chat;
    } catch (error) {
        return error.message;
    }
};

const newChat = async (username) => {
    try {
        const chat = await chatsService.newChat({username});
        return chat;
    } catch (error) {
        return error.message;
    }
};

const addMessage = async (payload) => {
    try {
        await chatsService.addMessage(payload);
        return "success";
    } catch (error) {
        return error.message;
    }
};

const updateUsers = async (username) => {
    try {
        await chatsService.updateUsers(username);
    } catch (error) {
        return error.message;
    }
};

const deleteUser = async (username) => {
    try {
        await chatsService.deleteUser(username);
    } catch (error) {
        res.status(500).send({ message: error.message || "Internal Server Error" });
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
