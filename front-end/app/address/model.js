import Ember from 'ember';
import DS from 'ember-data';

const {
	attr,
	belongsTo
} = DS;

const {
	computed,
	get
} = Ember;

export default DS.Model.extend({
	streetName: attr('string'),
	city: attr('string'),
	state: attr('string'),
	zipCode: attr('string'),
	country: attr('string'),
	lastUpdated: attr('date', {
		defaultValue: new Date()
	}),
	person: belongsTo('person', {
		async: true
	}),
	fullAddress: computed('streetName', 'city', 'state', 'zipCode', 'country', function() {
		let text = '';
		const attrs = ['streetName', 'city', 'state', 'zipCode'];

		attrs.forEach(attr => {
			if (get(this, `${attr}.length`)) {
				text += (text.length ? ', ' : '') + get(this, attr);
			}
		});

		return text;
	})
});
