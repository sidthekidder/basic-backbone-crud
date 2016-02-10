var APP = {}
APP.Router = Backbone.Router.extend({
  routes: {
    // recruiter views
    "recruiters/new": "creater",
    "recruiters/": "indexr",
    "recruiters/:id/edit": "editr",
    "recruiters/:id/view": "showr",
    // candidate views
    "candidates/new": "createc",
    "candidates/": "indexc",
    "candidates/:id/edit": "editc",
    "candidates/:id/view": "showc"
  },

  $container: null,

  initialize: function (options) {
    this.recruiters = options.recruiters
    this.candidates = options.candidates
    this.$container = $('#main-content')
    this.indexr()
  },

  creater: function () {
    var view = new APP.RecruiterNewView({
      recruiters: this.recruiters, 
      recruiter: new APP.RecruiterModel(),
      candidates: this.candidates
    })
    this.$container.html(view.render().el)
  },

  editr: function (id) {
    var view = new APP.RecruiterEditView({recruiter: this.recruiters.get(id), candidates: this.candidates})
    this.$container.html(view.render().el)
  },

  showr: function (id) {
    var view = new APP.RecruiterShowView({recruiter: this.recruiters.get(id), candidates: this.candidates})
    this.$container.html(view.render().el)
  },

  indexr: function () {
    var view = new APP.RecruiterIndexView({recruiters: this.recruiters})
    this.$container.html(view.render().el)
  },

  createc: function () {
    var view = new APP.CandidateNewView({
      candidates: this.candidates, 
      candidate: new APP.CandidateModel()
    })
    this.$container.html(view.render().el)
  },

  editc: function (id) {
    var view = new APP.CandidateEditView({candidate: this.candidates.get(id)})
    this.$container.html(view.render().el)
  },

  showc: function (id) {
    var view = new APP.CandidateShowView({candidate: this.candidates.get(id)})
    this.$container.html(view.render().el)
  },

  indexc: function () {
    var view = new APP.CandidateIndexView({candidates: this.candidates})
    this.$container.html(view.render().el)
  }
})
