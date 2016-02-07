APP.RecruiterNewView = Backbone.View.extend({
  events: {
    "click button.save": "save"
  },

  initialize: function (options) {
    this.recruiter  = options.recruiter
    this.recruiters = options.recruiters
    this.template = _.template($('#formTemplate').html())
  },

  save: function (event) {
    // stop form from submitting and update the model
    event.stopPropagation()
    event.preventDefault()

    this.recruiter.set({
      name: this.$el.find('input[name=name]').val(),
      id: Math.floor(Math.random() * 100) + 1
    })

    this.recruiters.add(this.recruiter)
    window.location.hash = "home/"
  },

  render: function () {
    this.$el.html(
    	this.template(this.recruiter.toJSON())
    )
    return this
  }
})
