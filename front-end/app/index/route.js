import Ember from 'ember';

export default Ember.Route.extend({
	model
});

function model() {
	this.store.createRecord('people', {
		firstName: 'Joe',
		lastName: 'Shmoe',
		createdAt: new Date(),
		lastModifiedAt: new Date()
	});
	return Ember.Object.create({
		users: this.store.fetchAll('people')
	});
}
