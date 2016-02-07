APP.RecruiterIndexView = Backbone.View.extend({
  initialize: function (options) {
    this.recruiters = options.recruiters
  },

  render: function () {
    this.$el.html($('#indexTemplate').html())
    this.addAll()
    return this
  },

  addAll: function () {
    this.$el.find('tbody').children().remove()
    _.each(this.recruiters.models, $.proxy(this, 'addOne'))
  },

  addOne: function (recruiter) {
    var view = new APP.RecruiterRowView({
      recruiters: this.recruiters, 
      recruiter: recruiter
    })
    this.$el.find("tbody").append(view.render().el)
  }
})

