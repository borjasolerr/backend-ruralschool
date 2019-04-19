const request = require('supertest');

const db = require('../database/dbConfig.js');
const server = require('../api/server.js');

describe('issuesRouter', () => {
  it('should set up a testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET /', () => {
    it('should return a 200 status code', async () => {
      const res = await request(server).get('/api/issues');
      expect(res.status).toBe(200);
    });
  });

  describe('POST /', () => {
    afterEach(async () => {
      await db('issues').truncate();
    });

    it('should create a new issue and return a 201 status code', async () => {
      const test = {
        name: 'mops',
        category: 'janitorial',
        username: 'Michel',
        notes: 'This is notes about mops',
        logDate: 1356766,
        status: 'ignored'
      };
      const res = await request(server)
        .post('/api/issues')
        .send(test);
      expect(res.status).toBe(201);
    });
  });

  describe('PUT /:id', () => {
    afterEach(async () => {
      await db('issues').truncate();
    });

    it('should update the issue and return a 200 status code', async () => {
      let test = {
        name: 'mops',
        category: 'janitorial',
        username: 'Michel',
        notes: 'This is notes about mops',
        logDate: 1356766,
        status: 'ignored'
      };
      const insert = await request(server)
        .post('/api/issues')
        .send(test);
      expect(insert.status).toBe(201);
      test = {
        name: 'mops',
        category: 'janitorial',
        username: 'Michel',
        notes: 'This is notes about mops',
        logDate: 1356766,
        status: 'scheduled'
      };
      const res = await request(server)
        .put('/api/issues/1')
        .send(test);
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /:id', () => {
    it('should delete the issue and return a 204 status code', async () => {
      const test = {
        name: 'mops',
        category: 'janitorial',
        username: 'Michel',
        notes: 'This is notes about mops',
        logDate: 1356766,
        status: 'ignored'
      };
      const insert = await request(server)
        .post('/api/issues')
        .send(test);
      expect(insert.status).toBe(201);
      const res = await request(server).delete('/api/issues/1');
      expect(res.status).toBe(204);
      await db('issues').truncate();
    });
  });
});
