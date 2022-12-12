# Setup file to upload data to MongoDB 
mongo portfolio --eval "db.dropDatabase()" 
mongoimport -d Chats -c videos --file data/chats.json