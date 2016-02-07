var APP = {}
APP.RecruiterRouter = Backbone.Router.extend({
  routes: {
    "home/new": "create",
    "home/": "index",
    "home/:id/edit": "edit",
    "home/:id/view": "show"
  },

  $container: null,

  initialize: function (options) {
    this.recruiters = options.recruiters
    this.$container = $('#main-content')
    this.index()
  },

  create: function () {
    var view = new APP.RecruiterNewView({
      recruiters: this.recruiters, 
      recruiter: new APP.RecruiterModel()
    })
    this.$container.html(view.render().el)
  },

  edit: function (id) {
    var view = new APP.RecruiterEditView({recruiter: this.recruiters.get(id)})
    this.$container.html(view.render().el)
  },

  show: function (id) {
    var view = new APP.RecruiterShowView({recruiter: this.recruiters.get(id)})
    this.$container.html(view.render().el)
  },

  index: function () {
    var view = new APP.RecruiterIndexView({recruiters: this.recruiters})
    this.$container.html(view.render().el)
  }
})
