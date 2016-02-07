APP.RecruiterEditView = Backbone.View.extend({
  events: {
    "click button.save": "save"
  },

  initialize: function (options) {
    this.recruiter  = options.recruiter
    this.template = _.template($('#formTemplate').html())
  },

  save: function (event) {
    event.stopPropagation()
    event.preventDefault()

    this.recruiter.set({
      name: this.$el.find('input[name=name]').val()
    })
    // this.recruiter.save() would save through an API call
    window.location.hash = "#home/"
  },

  render: function () {
    this.$el.html(
    	this.template(this.recruiter.toJSON())
    )
    return this
  }
})
