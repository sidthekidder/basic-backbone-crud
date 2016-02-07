APP.RecruiterRowView = Backbone.View.extend({
  tagName: "tr",
  events: {
    "click a.delete": "destroy"
  },

  initialize: function (options) {
    this.recruiter  = options.recruiter
    this.recruiters = options.recruiters
    this.template = _.template($('#rowTemplate').html())
  },

  render: function () {
    this.$el.html(
    	this.template(this.recruiter.toJSON())
    )
    return this
  },

  destroy: function (event) {
    event.preventDefault()
    event.stopPropagation()
    // this.model.destroy() would delete the model through an API call
    this.recruiters.remove(this.recruiter)
    this.$el.remove()
  }
})
