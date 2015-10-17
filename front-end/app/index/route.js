import Ember from 'ember';

const {
	set
} = Ember;

/**
 * Our index route.
 * @public
 * @exports {Object}
 */
export default Ember.Route.extend({
	model
});

/**
 * Returns the model for our index route.
 * @public
 * @memberOf {Index.Route}
 * @return {Ember.Object}
 */
function model() {
	const record = this.store.createRecord('people', {
		firstName: 'Joe',
		lastName: 'Shmoe',
		age: 31,
		createdAt: new Date(),
		lastModifiedAt: new Date()
	});

	const indexModel = Ember.Object.create({
		person: record
	});

	record
		.save()
		.then(success => {
			set(indexModel, 'success', true);
		}).catch(error => {
			set(indexModel, 'error', true);
			set(indexModel, 'errorMsg', error.message);
		});

	return indexModel;
}
