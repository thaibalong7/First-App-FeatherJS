/* eslint-disable no-console */

// locations-model.js - A KnexJS
// 
// See http://knexjs.org/
// for more of what you can do here.

const { Model } = require('objection');

class Locations extends Model {

  static setup(app) {
    this.app = app;
  }


  // Table name is the only required property.
  static get tableName() {
    return 'locations';
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return 'id';
  }

  // Methods can be defined for model classes just as you would for
  // any JavaScript class. If you want to include the result of these
  // method in the output json, see `virtualAttributes`.

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName'],

      properties: {
        id: { type: 'integer' },
        latitude: { type: ['integer', 'null'] },
        longitude: { type: ['integer', 'null'] },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        address: { type: 'string', minLength: 1, maxLength: 255 },

        // Properties defined as objects or arrays are
        // automatically converted to JSON strings when
        // writing to database and back to objects and arrays
        // when reading from database. To override this
        // behaviour, you can override the
        // Model.jsonAttributes property.
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    const types = require('./types');

    return {

      // movies: {
      //   relation: Model.ManyToManyRelation,
      //   modelClass: Movie,
      //   join: {
      //     from: 'persons.id',
      //     // ManyToMany relation needs the `through` object
      //     // to describe the join table.
      //     through: {
      //       // If you have a model class for the join table
      //       // you need to specify it like this:
      //       // modelClass: PersonMovie,
      //       from: 'persons_movies.personId',
      //       to: 'persons_movies.movieId'
      //     },
      //     to: 'movies.id'
      //   }
      // },

      // children: {
      //   relation: Model.HasManyRelation,
      //   modelClass: Locations,
      //   join: {
      //     from: 'persons.id',
      //     to: 'persons.parentId'
      //   }
      // },

      types_of_locations: {
        relation: Model.BelongsToOneRelation,
        modelClass: types,
        join: {
          from: 'locations.fk_type',
          to: 'types.id'
        }
      }
    };
  }
}


module.exports = function (app) {
  if (app) {
    const db = app.get('knexClient');
    const {tableName} = Locations;
    db.schema.hasTable(tableName).then(exists => {
      if (!exists) {
        // eslint-disable-next-line no-console
        console.error(`Table "${tableName}" doesn't exist.`);
      }
    });

  }

  return Locations;
};
