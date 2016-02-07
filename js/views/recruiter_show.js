APP.RecruiterShowView = Backbone.View.extend({
  initialize: function (options) {
    this.recruiter = options.recruiter
    this.template = _.template($('#showTemplate').html())
  },

  render: function () {
    this.$el.html(
      this.template(this.recruiter.toJSON())
    )
    return this
  }
})