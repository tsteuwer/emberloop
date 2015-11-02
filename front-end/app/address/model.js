import DS from 'ember-data';

const {
	attr,
	belongsTo
} = DS;

export default DS.Model.extend({
	streetName: attr('String'),
	city: attr('String'),
	state: attr('String'),
	zipCode: attr('String'),
	country: attr('String'),
	lastUpdated: attr('Date', {
		defaultValue: new Date()
	}),
	person: belongsTo('person', {
		async: true
	})
});
