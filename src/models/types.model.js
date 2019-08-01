// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class types extends Model {

  static get tableName() {
    return 'types';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text'],

      properties: {
        text: { type: 'string' }
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('types').then(exists => {
    if (!exists) {
      db.schema.createTable('types', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created types table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating types table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating types table', e)); // eslint-disable-line no-console

  return types;
};
