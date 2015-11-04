import Ember from 'ember';
import {
	moduleForModel,
	test
} from 'ember-qunit';

const {
	get
} = Ember;

moduleForModel('address', 'Unit | Model | address', {
  // Specify the other units that are required for this test.
	needs: ['model:person']
});

test('attributes should be set', function(assert) {
	assert.expect(6);

	const updated = new Date();

  const model = this.subject({
		streetName: '123 Main St',
		city: 'Twiddly Dee',
		state: 'Florida',
		zipCode: '12345',
		country: 'US',
		lastUpdated: updated
	});

  assert.equal(get(model, 'streetName'), '123 Main St', 'street name should be set');
  assert.equal(get(model, 'city'), 'Twiddly Dee', 'city should be set');
  assert.equal(get(model, 'state'), 'Florida', 'state hould be set');
  assert.equal(get(model, 'zipCode'), '12345', 'zip code hould be set');
	assert.equal(get(model, 'country'), 'US', 'country should be set');
	assert.equal(get(model, 'lastUpdated' ), updated, 'lastUpdated should be a date');
});

test('should have a person relationship', function(assert) {
	assert.expect(4);

	const Address = this.store().modelFor('address');
	const relationships = get(Address, 'relationshipsByName');
	const person = relationships.get('person');

	assert.ok(person.isRelationship, 'should have a relationship');
	assert.ok(person.options.async, 'should be an async relationship');
	assert.equal(person.key, 'person', 'has a relationship to person');
	assert.equal(person.kind, 'belongsTo', 'address should belong to address');
});

test('default values should be set', function(assert) {
	const model = this.subject({
		streetName: '123 Main St',
		city: 'Twiddly Dee',
		state: 'Florida',
		zipCode: '12345',
		country: 'US'
	});

	assert.ok(get(model, 'lastUpdated') instanceof Date, 'lastUpdated should have a default Date object');
});

test('computed properties should work - fully-filled', function(assert) {
	const model = this.subject({
		streetName: '123 Main St',
		city: 'Twiddly Dee',
		zipCode: '12345',
		country: 'US'
	});

	assert.equal(get(model, 'fullAddress'), '123 Main St, Twiddly Dee, 12345', 'Full name should be computed');
});

test('computed properties should work - semi-filled', function(assert) {
	const model = this.subject({
		streetName: '123 Main St',
		city: 'Twiddly Dee',
		state: 'Florida',
		country: 'US'
	});

	assert.equal(get(model, 'fullAddress'), '123 Main St, Twiddly Dee, Florida', 'Full name should be computed');
});
