import DS from 'ember-data';
import Ember from 'ember';

const {
	attr
} = DS;

const {
	computed,
	Inflector,
	get
} = Ember;

/**
 * Change people back to 'people' model. Ember tries to pluralize and singularize some default names.
 * You can see default ones at:
 * https://github.com/stefanpenner/ember-inflector/blob/master/addon/lib/system/inflections.js
 */
Inflector.inflector.irregular('people', 'people');

export default DS.Model.extend({
	firstName: attr('String'),
	lastName: attr('String'),
	age: attr('Number'),
	createdAt: attr('Date', {
		defaultValue: new Date()
	}),
	lastModifiedAt: attr('Date', {
		defaultValue: new Date()
	}),
	fullName: computed('firstName', 'lastName', () => {
		return `${get(this, 'firstName')} ${get(this, 'lastName')}`;
	})
});
