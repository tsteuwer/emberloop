import Ember from 'ember';

const {
	get,
	run,
	RSVP,
	set
} = Ember;

const {
	Promise
} = RSVP;

/**
 * Our index route.
 * @public
 * @exports {Object}
 */
export default Ember.Route.extend({
	afterModel,
	getNextMethod,
	model,
	peopleId: '',
	post,
	getById,
	methods: [
		'post',
		'getById'
	]
});

function pushResult(result) {
	get(this.controller, 'model.testCases').pushObject(result);
	this.afterModel();
}

function getNextMethod() {
	const method = get(this, 'methods').shift();
	return method;
}

/**
 * Returns the model for our index route.
 * @public
 * @memberOf {Index.Route}
 * @return {Ember.Object}
 */
function model() {
	return Ember.Object.create({
		testCases: []
	});
}

function afterModel() {
	const resultCallback = run.bind(this, pushResult);
	let method = this.getNextMethod();	

	if (method) {
		this[method]().then(resultCallback, resultCallback);
	}
}

function post() {
	return new Promise((resolve, reject) => {
		const record = this.store.createRecord('people', {
			firstName: 'Joe',
			lastName: 'Shmoe',
			age: 31,
			createdAt: new Date(),
			lastModifiedAt: new Date()
		});

		record
			.save()
			.then(() => {
				resolve({
					pass: true,
					msg: 'POST /people/'
				});

				run(() => set(this, 'peopleId', record.get('id')));
			}).catch(() => {
				reject({
					pass: false,
					msg: 'POST /people/'
				});
			});
	});
}

function getById() {
	return new Promise((resolve, reject) => {
		this.store.findById('people', get(this, 'peopleId'), {
			reload: true
		}).then(() => {
			resolve({
				pass: true,
				msg: 'GET /people/:id'
			});
		}).catch(() => {
			reject({
				pass: false,
				msg: 'POST /people/:id'
			});
		});
	});
}
