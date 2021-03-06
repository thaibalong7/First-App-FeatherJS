// Initializes the `types` service on path `/types`
const createService = require('feathers-objection');
const createModel = require('../../models/types.model');
const hooks = require('./types.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/types', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('types');

  service.hooks(hooks);
};
