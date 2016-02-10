APP.CandidateModel = Backbone.Model.extend({
  defaults: {
    name: "",
    included: false
  }
})

APP.CandidateCollection = Backbone.Collection.extend({
  model: APP.CandidateModel
})
