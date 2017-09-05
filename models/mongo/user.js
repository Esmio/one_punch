const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {type: String, required: true},
	age: {type: Number, max: [90, 'Nobody over 90 could use postman']},
})

UserSchema.index({name: 1}, {unique: true})

UserSchema.index({name: 1, age: 1})

const UserModel = mongoose.model('user', UserSchema);

async function createANewUser(params) {
	const user = new UserModel({name: params.name, age: params.age})
	return await user.save()
		.catch(e=>{
			console.log(e)
			switch (e.code) {
				case 11000 : 
					throw new Error('Someone has picked that name, choose another!')
					break;
				default: 
					throw new Error(`error creating user ${ JSON.stringify(params) }`)
					break;
			}
		})
}

async function getUsers(params = {page: 0, pageSize: 10}){
	let flow = UserModel.find({})
	flow.skip(params.page * params.pageSize)
	flow.limit(params.pageSize)
	return await flow
		.catch(e=>{
			console.log(e)
			throw new Error('error getting users from db')
		})
}

async function getUserById(userId){
	return await UserModel.findOne({_id: userId})
		.catch(e=>{
			console.log(e)
			throw new Error(`error getting user by id: ${userId}`)
		});
}

async function updateUserById(userId, update){
	return await UserModel.findOneAndUpdate({_id: userId}, update, {new: true})
		.catch(e=>{
			console.log(e)
			throw new Error(`error updating user by id: ${userId}`)
		});
}

module.exports = {
	model: UserModel,
	createANewUser,
	getUsers,
	getUserById,
	updateUserById
}