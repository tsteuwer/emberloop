import DS from 'ember-data';
import Ember from 'ember';

const {
	attr
} = DS;

const {
	computed,
	get
} = Ember;

export default DS.Model.extend({
	firstName: attr('String'),
	lastName: attr('String'),
	age: attr('Number'),
	createdAt: attr('Date', {
		default: new Date()
	}),
	lastModifiedAt: attr('Date', {
		default: new Date()
	}),
	fullName: computed('firstName', 'lastName', () => {
		return `${get(this, 'firstName')} ${get(this, 'lastName')}`;
	})
});
