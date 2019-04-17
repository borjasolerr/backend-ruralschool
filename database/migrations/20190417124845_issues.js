exports.up = function(knex) {
  return knex.schema.createTable('issues', issues => {
    issues.increments();

    issues
      .string('name', 128)
      .notNullable()
      .unique();

    issues.string('category', 128).notNullable();

    issues.string('username', 128).notNullable();

    issues.string('notes', 128);

    issues.integer('logDate');

    issues
      .string('status', 128)
      .notNullable()
      .defaultTo('ignored');

    issues.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('issues');
};
