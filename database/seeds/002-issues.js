exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('issues')
    .truncate()
    .then(function() {
      return knex('issues').insert([
        {
          name: 'computers',
          category: 'electronics',
          username: 'Borja',
          notes: 'This is notes about computers',
          logDate: 123456,
          status: 'ignored'
        },
        {
          name: 'keyboards',
          category: 'electronics',
          username: 'Michel',
          notes: 'This is notes about keyboards',
          logDate: 123457,
          status: 'ignored'
        },
        {
          name: 'desk chairs',
          category: 'hardware',
          username: 'Borja',
          logDate: 124556,
          status: 'ignored'
        }
      ]);
    });
};
