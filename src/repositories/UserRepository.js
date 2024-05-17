export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = () => {
    return this.dao.getAll();
  };

  getBy = (params) => {
    return this.dao.getBy(params);
  };

  saveUser = async (user) => {
    return this.dao.saveUser(user);
  };

  updateUser = async (id, user) => {
    return this.dao.updateUser(user);
  };
}
