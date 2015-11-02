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
	personId: '',
	addressId: '',
	post,
	getById,
	getAll,
	postAddress,
	addRelationship,
	checkRelationshipAddress,
	checkRelationshipPerson,
	tearDown,
	methods: [
		'post',
		'post',
		'post',
		'getAll',
		'getById',
		'postAddress',
		'addRelationship',
		'checkRelationshipAddress',
		'checkRelationshipPerson',
		'tearDown'
	]
});

/**
 * Pushes the result of a test over to the model.
 * @public
 * @param {Object} result
 * @return {undefined}
 */
function pushResult(result) {
	get(this.controller, 'model.testCases').pushObject(result);
	this.afterModel();
}

/**
 * Gets the next method off the array.
 * @public
 * @return {String} method
 */
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
		testing: true,
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
		const record = this.store.createRecord('person', {
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
					msg: 'POST /person/'
				});
				
				if (get(this, 'personId') === '') {
					run(() => set(this, 'personId', record.get('id')));
				}
			}).catch(error => {
				reject({
					pass: false,
					msg: `POST /person (reason: ${error.toString()})`
				});
			});
	});
}

function getAll() {
	return new Promise((resolve, reject) => {
		this.store.findAll('person').then((people) => {
			const found = get(people, 'length');
			resolve({
				pass: found === 3,
				msg: `GET /person/ found ${get(people, 'length')} results`
			});
		}).catch(error => {
			reject({
				pass: false,
				msg: `GET /person (reason: ${error.toString()})`
			});
		});
	});
}

function getById() {
	return new Promise((resolve, reject) => {
		this.store.findRecord('person', get(this, 'personId'), {
			reload: true
		}).then(() => {
			resolve({
				pass: true,
				msg: 'GET /person/:id'
			});
		}).catch(error => {
			reject({
				pass: false,
				msg: `GET /person/:id (reason: ${error.toString()})`
			});
		});
	});
}

function postAddress() {
	return new Promise((resolve, reject) => {
		const address = this.store.createRecord('address', {
			streetName: '123 Main St',
			city: 'City City',
			state: 'Florida',
			country: 'USA',
			zipCode: '12345',
			person: this.store.peekRecord('person', get(this, 'personId'))
		});

		address.save().then(() => {
			run(() => {
				set(this, 'addressId', get(address, 'id'));
			});

			resolve({
				pass: true,
				msg: 'POST /address/',
			});
		}).catch(error => {
			reject({
				pass: false,
				msg: `POST /address/ (reason: ${error.toString()})`,
			});
		});
	});
}

function addRelationship() {
	return new Promise((resolve, reject) => {
		const person = this.store.peekRecord('person', get(this, 'personId'));
		const address = this.store.peekRecord('address', get(this, 'addressId'));

		run(() => {
			person.set('address', address);
		});

		person.save().then(() => {
			resolve({
				pass: true,
				msg: 'PATCH /person/:id',
			});
		}).catch(error => {
			reject({
				pass: false,
				msg: `PATCH /person/:id (reason: ${error.toString()})`,
			});
		});
	});
}
function checkRelationshipAddress() {
	return new Promise((resolve, reject) => {
		const personId = get(this, 'personId');
		const addressId = get(this, 'addressId');

		// Remove the records from our data store.
		this.store.peekRecord('person', personId).unloadRecord();
		this.store.peekRecord('address', addressId).unloadRecord();

		this.store
			.findRecord('person', personId)
			.then((person) => {
				person.get('address').then(address => {
					if (get(address, 'isLoaded') && addressId === get(address, 'id')) {
						resolve({
							pass: true,
							msg: 'GET /address/:id by relationship',
						});
					} else {
						resolve({
							pass: false,
							msg: 'GET /address/:id by relationship',
						});
					}
				}).catch(error => {
					reject({
						pass: false,
						msg: `GET /address/:id by relationship (reason: ${error.toString()})`,
					});
				});

			}).catch(error => {
				reject({
					pass: false,
					msg: `GET /address/:id by relationship (reason: ${error.toString()})`,
				});
			});
	});
}

function checkRelationshipPerson() {
	return new Promise((resolve, reject) => {
		const personId = get(this, 'personId');
		const addressId = get(this, 'addressId');

		// Remove the records from our data store.
		this.store.peekRecord('person', personId).unloadRecord();
		this.store.peekRecord('address', addressId).unloadRecord();

		this.store
			.findRecord('address', addressId)
			.then(address => {
				address.get('person').then(person => {
					if (get(person, 'isLoaded') && personId === get(person, 'id')) {
						resolve({
							pass: true,
							msg: 'GET /person/:id by relationship',
						});
					} else {
						reject({
							pass: false,
							msg: 'GET /person/:id by relationship',
						});
					}
				}).catch(error => {
					reject({
						pass: false,
						msg: `GET /person/:id by relationship (reason: ${error.toString()})`,
					});
				});

			}).catch(error => {
				reject({
					pass: false,
					msg: `GET /person/:id by relationship (reason: ${error.toString()})`,
				});
			});
	});
}

function tearDown() {
	const records = {
		people: this.store.peekAll('person'),
		addresses: this.store.peekAll('address')
	};
	
	return new Promise((resolve, reject) => {
		try {
			for (let i in records) {
				records[i].forEach(model => {
					model.destroyRecord();
					model.save();
				});
			}

			resolve({
				pass: true,
				msg: 'All Records Deleted!',
			});
		} catch (error) {
			reject({
				pass: true,
				msg: `tearDown: ${error.toString()}`,
			});
		}
	}).catch(() => {
		set(this.controller, 'model.testing', false);
	});
}
