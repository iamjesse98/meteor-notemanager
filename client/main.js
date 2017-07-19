import { Template } from 'meteor/templating'

import { Accounts } from 'meteor/accounts-base'

import { Notes } from '../lib/collections.js'
// mongoose shell  -  meteor mongo

import './main.html'

// Accounts config
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
})

Template.body.helpers({
  /*
  notes: [
    {text: 'My Note 1'},
    {text: 'My Note 2'},
    {text: 'My Note 3'}
  ]
  */
  notes() {
    return Notes.find({})
  }
})

Template.add.events({
  'submit .add-form': function() {
    event.preventDefault()
    // Get input value
    const target = event.target
    const text = target.text.value
    // insert note into collection
    // if(text !== '')
    // Notes.insert({
    //   text,
    //   createdAt: new Date(),
    //   owner: Meteor.userId(),
    //   uname: Meteor.user().username
    // })
    Meteor.call('notes.insert', text)
    // clear the form
    target.text.value = ''
    $('#addModal').closeModal()
    return false
  }
})

Template.note.events({
  'click .delete-note': function(){
    //Notes.remove(this._id)
    Meteor.call('notes.remove', this)
    return false
  }
})
