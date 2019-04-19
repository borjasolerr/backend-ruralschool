const db = require('../database/dbConfig.js');
const Users = require('./usersModel.js');

describe('userModel.js', () => {
  it('should set testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('add', () => {
    afterEach(async () => {
      await db('users').truncate();
    });

    it('should insert the provided user into the database', async () => {
      let user = await Users.add({
        username: 'Borja',
        password: 'password',
        authLevel: 'Admin'
      });
      expect(user.username).toBe('Borja');

      user = await Users.add({
        username: 'Michel',
        password: 'kjahdlkfjhakdjh',
        authLevel: 'Board Member'
      });
      expect(user.username).toBe('Michel');
    });
  });

  describe('find', () => {
    afterEach(async () => {
      await db('users').truncate();
    });

    it('should find all users in the database', async () => {
      let user = await Users.add({
        username: 'Borja',
        password: 'password',
        authLevel: 'Admin'
      });
      expect(user.username).toBe('Borja');

      const games = await Users.find();
      expect(games).toHaveLength(1);
    });
  });
});
