import callAPI from './config';

const usersAPI = {
  getUsers () {
    const url = "/users";
    return callAPI.get(url)
  },
  addUser (user) {
    const url = "/users";
    return callAPI.post(url, user)
  }

}

export default usersAPI