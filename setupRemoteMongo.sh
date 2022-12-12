# Setup file template to upload data to MongoDB Atlas
mongoimport --uri "mongodb+" --drop --collection Chats --file data/chats.json