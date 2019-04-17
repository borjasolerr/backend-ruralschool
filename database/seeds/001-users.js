exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        {
          username: 'Borja',
          password: 'password',
          authLevel: 'Admin',
          organization: 'Disney'
        },
        {
          username: 'Michel',
          password: 'password123',
          authLevel: 'Board Memeber',
          organization: 'Virtux'
        }
      ]);
    });
};
