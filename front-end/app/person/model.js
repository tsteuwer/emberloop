import DS from 'ember-data';
import Ember from 'ember';

const {
	attr,
	belongsTo
} = DS;

const {
	computed,
	get
} = Ember;

export default DS.Model.extend({
	firstName: attr('string'),
	lastName: attr('string'),
	age: attr('number'),
	createdAt: attr('date', {
		defaultValue: new Date()
	}),
	lastModifiedAt: attr('date', {
		defaultValue: new Date()
	}),
	address: belongsTo('address', {
		async: true
	}),
	fullName: computed('firstName', 'lastName', function() {
		return `${get(this, 'firstName')} ${get(this, 'lastName')}`;
	})
});
