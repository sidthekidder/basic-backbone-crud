APP.RecruiterNewView = Backbone.View.extend({
  events: {
    "click button.save": "save"
  },

  initialize: function (options) {
    this.recruiter  = options.recruiter
    this.recruiters = options.recruiters
    this.candidates = options.candidates
    this.template = _.template($('#formTemplater').html())
  },

  save: function (event) {
    // stop form from submitting and update the model
    event.stopPropagation()
    event.preventDefault()

    var canList = this.$el.find('input[name=cands]')
    // get the list of candidates that have been checked
    var finallist = []
    for(var v = 0 ; v < canList.length ; v++ ) {
      if ($(canList[v]).prop('checked')) {
        finallist.push(canList[v].value.toString())
      }
    }

    this.recruiter.set({
      name: this.$el.find('input[name=name]').val(),
      candidates: finallist,
      id: Math.floor(Math.random() * 100) + 1
    })

    this.recruiters.add(this.recruiter)
    window.location.hash = "recruiters/"
  },

  render: function () {
    var checkedList = []
    var uncheckedList = this.candidates.toJSON()

    this.$el.html(
    	this.template({'rec': this.recruiter.toJSON(), candsChecked: checkedList, candsUnchecked: uncheckedList})
    )
    return this
  }
})

APP.RecruiterEditView = Backbone.View.extend({
  events: {
    "click button.save": "save"
  },

  initialize: function (options) {
    this.recruiter  = options.recruiter
    this.candidates = options.candidates
    this.template = _.template($('#formTemplater').html())
  },

  save: function (event) {
    event.stopPropagation()
    event.preventDefault()

    var canList = this.$el.find('input[name=cands]')
    // get the list of candidates that have been checked
    var finallist = []
    for(var v = 0 ; v < canList.length ; v++ ) {
      if ($(canList[v]).prop('checked')) {
        finallist.push(canList[v].value.toString())
      }
    }

    this.recruiter.set({
      name: this.$el.find('input[name=name]').val(),
      candidates: finallist
    })
    // this.recruiter.save() would save through an API call
    window.location.hash = "#recruiters/"
  },

  render: function () {
    var checkedList = [], uncheckedList = []
    var cans = this.candidates.toJSON()

    for(var i = 0 ; i < cans.length ; i++) {
      cans[i].included = false
    }

    // for each of the recruiter's candidate ids
    _.each(this.recruiter.toJSON().candidates, function (cand) {
      // fetch the corresponding candidate and add to checkedList
      for(var i = 0 ; i < cans.length ; i++) {
        if (cans[i].id == cand) {
          checkedList.push({'id': cans[i].id, 'name': cans[i].name})
          cans[i].included = true
        }
      }
    })
    // add all the remaining candidates to uncheckedList
    for(var i = 0 ; i < cans.length ; i++) {
      if (cans[i].included == false) {
        uncheckedList.push({'id': cans[i].id, 'name': cans[i].name})
      }
    }

    this.$el.html(
      this.template({'rec': this.recruiter.toJSON(), candsChecked: checkedList, candsUnchecked: uncheckedList})
    )
    return this
  }
})

APP.RecruiterRowView = Backbone.View.extend({
  tagName: "tr",
  events: {
    "click a.delete": "destroy"
  },

  initialize: function (options) {
    this.recruiter  = options.recruiter
    this.recruiters = options.recruiters
    this.template = _.template($('#rowTemplater').html())
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

APP.RecruiterShowView = Backbone.View.extend({
  initialize: function (options) {
    this.recruiter = options.recruiter
    this.candidates = options.candidates
    var cands = []
    var cans = this.candidates.toJSON()
    // for each of the recruiter's candidate ids
    _.each(this.recruiter.toJSON().candidates, function (cand) {
      // fetch the corresponding name
      _.each(cans, function (cand1) {
        if (cand1.id == cand) {
          cands.push({'name': cand1.name})
        }
      })
    })
    this.cands = cands
    this.template = _.template($('#showTemplater').html())
  },

  render: function () {
    this.$el.html(
      this.template({'rec': this.recruiter.toJSON(), 'cands': this.cands})
    )
    return this
  }
})

APP.RecruiterIndexView = Backbone.View.extend({
  initialize: function (options) {
    this.recruiters = options.recruiters
  },

  render: function () {
    this.$el.html($('#indexTemplater').html())
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

