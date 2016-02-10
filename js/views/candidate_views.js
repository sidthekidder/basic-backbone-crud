APP.CandidateNewView = Backbone.View.extend({
  events: {
    "click button.save": "save"
  },

  initialize: function (options) {
    this.candidate  = options.candidate
    this.candidates = options.candidates
    this.template = _.template($('#formTemplatec').html())
  },

  save: function (event) {
    // stop form from submitting and update the model
    event.stopPropagation()
    event.preventDefault()

    this.candidate.set({
      name: this.$el.find('input[name=name]').val(),
      id: Math.floor(Math.random() * 100) + 1
    })

    this.candidates.add(this.candidate)
    window.location.hash = "candidates/"
  },

  render: function () {
    this.$el.html(
      this.template(this.candidate.toJSON())
    )
    return this
  }
})

APP.CandidateEditView = Backbone.View.extend({
  events: {
    "click button.save": "save"
  },

  initialize: function (options) {
    this.candidate  = options.candidate
    this.template = _.template($('#formTemplatec').html())
  },

  save: function (event) {
    event.stopPropagation()
    event.preventDefault()

    this.candidate.set({
      name: this.$el.find('input[name=name]').val()
    })
    // this.candidate.save() would save through an API call
    window.location.hash = "#candidates/"
  },

  render: function () {
    this.$el.html(
      this.template(this.candidate.toJSON())
    )
    return this
  }
})

APP.CandidateRowView = Backbone.View.extend({
  tagName: "tr",
  events: {
    "click a.delete": "destroy"
  },

  initialize: function (options) {
    this.candidate  = options.candidate
    this.candidates = options.candidates
    this.template = _.template($('#rowTemplatec').html())
  },

  render: function () {
    this.$el.html(
      this.template(this.candidate.toJSON())
    )
    return this
  },

  destroy: function (event) {
    event.preventDefault()
    event.stopPropagation()
    // this.model.destroy() would delete the model through an API call
    this.candidates.remove(this.candidate)
    this.$el.remove()
  }
})

APP.CandidateShowView = Backbone.View.extend({
  initialize: function (options) {
    this.candidate = options.candidate
    this.template = _.template($('#showTemplatec').html())
  },

  render: function () {
    this.$el.html(
      this.template(this.candidate.toJSON())
    )
    return this
  }
})

APP.CandidateIndexView = Backbone.View.extend({
  initialize: function (options) {
    this.candidates = options.candidates
  },

  render: function () {
    this.$el.html($('#indexTemplatec').html())
    this.addAll()
    return this
  },

  addAll: function () {
    this.$el.find('tbody').children().remove()
    _.each(this.candidates.models, $.proxy(this, 'addOne'))
  },

  addOne: function (candidate) {
    var view = new APP.CandidateRowView({
      candidates: this.candidates, 
      candidate: candidate
    })
    this.$el.find("tbody").append(view.render().el)
  }
})

