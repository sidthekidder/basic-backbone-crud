
APP.RecruiterModel = Backbone.Model.extend({
  defaults: {
    name: ""
  }
})

APP.RecruiterCollection = Backbone.Collection.extend({
  model: APP.RecruiterModel
})
