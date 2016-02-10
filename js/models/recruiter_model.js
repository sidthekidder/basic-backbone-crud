APP.RecruiterModel = Backbone.Model.extend({
  defaults: {
    name: "",
    candidates: []
  }
})

APP.RecruiterCollection = Backbone.Collection.extend({
  model: APP.RecruiterModel
})
