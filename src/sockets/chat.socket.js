const { chatByName, newChat, addMessage, updateUsers, deleteUser } = require("../controllers/chats.controller");

function registerChatSockets(io) {
  io.on("connection", (socket) => {

    socket.on("join", async (username, callback) => {

      socket.username = username;

      try {
        // Attempt to get data related to the username
        let data = await chatByName(username);
        if (!data) {
          //If no data found create new chat
          data = await newChat(username);
        }

        //Update users list who are online
        await updateUsers(username);

        callback({ status: "success", data });
      } catch (error) {
        // If an error occurs, emit an "Error" event with the error message
        callback({ status: "failed" });
        console.error(error.messsage);
      }
    });


    // Receive message, persist, and broadcast
    socket.on("sendMessage", async (payload) => {
      try {
        const saved = await addMessage(payload);
        if (saved == "success") {
          io.emit("newMessage", payload?.messageObj);
        }
      } catch (err) {
        socket.emit("systemMessage", { text: "Failed to send message" });
      }
    });

    // socket.on("typing", ({ room, person }) => {
    //   if (!room) return;
    //   socket.to(room).emit("typing", { room, person });
    // });

    // socket.on("stopTyping", ({ room, person }) => {
    //   if (!room) return;
    //   socket.to(room).emit("stopTyping", { room, person });
    // });


    socket.on("disconnect", async () => {
      try {
        const username = socket.username;

        // If the user is found in the database, delete them
        if (username) {
          await deleteUser(username);
        }
      } catch (error) {
        console.error("Error while removing user on disconnect:", error);
      }
    });
  });
}

module.exports = { registerChatSockets };
