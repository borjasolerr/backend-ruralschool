const localPgConnection = {
  host: 'localhost',
  database: 'users',
  user: 'Borja',
  password: 'a1s2d3f4g5'
};
const prodDbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/users.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: prodDbConnection,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
