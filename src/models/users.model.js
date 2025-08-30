const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		user: {
			type: String,
			required: true
		}
	}
);

const Users = mongoose.model('User', userSchema);

module.exports = Users;
