exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users
      .string('username', 128)
      .notNullable()
      .unique();

    users.string('password', 128).notNullable();

    users.string('authLevel', 128).notNullable();

    users.string('organization', 128);

    users.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
