const up = knex => {
  return knex.schema.hasTable('Person').then(exists => {
    if (!exists) {
      return knex.schema.createTable('Person', table => {
        table.increments('id');
        table.string('name', 100).notNullable();
        table.string('lastName', 100).defaultTo(null);
        table.string('document', 15).notNullable();
        table.string('genre', 1).notNullable();
        table.integer('phone').unsigned().notNullable();
        table.timestamps(true, true);

        table.unique('document');
      });
    }
  });
};

const down = knex => {
  return knex.schema.dropTable('Person');
};

module.exports = {
  up,
  down
};
