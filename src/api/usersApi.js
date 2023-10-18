import callAPI from './config';

const usersAPI = {
	getUsers() {
		const url = '/users';
		return callAPI.get(url);
	},
	getUser(id) {
		const url = `/users/${id}`;
		return callAPI.get(url);
	},
	addUser(user) {
		const url = '/users';
		return callAPI.post(url, user);
	},
	updateUser(user) {
		const userId = user.id;
		const url = `/users/${userId}`;
		return callAPI.patch(url, user);
	},
};

export default usersAPI;
