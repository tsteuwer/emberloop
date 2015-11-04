import Ember from 'ember';
import {
	moduleForModel,
	test
} from 'ember-qunit';

const {
	get
} = Ember;

moduleForModel('person', 'Unit | Model | person', {
  // Specify the other units that are required for this test.
	needs: ['model:address']
});

test('attributes should be set', function(assert) {
	assert.expect(5);

	const created = new Date();
	const modified = new Date();

  const model = this.subject({
		firstName: 'Jane',
		lastName: 'Doe',
		age: 22,
		createdAt: created,
		lastModifiedAt: modified
	});

  assert.equal(get(model, 'firstName'), 'Jane', 'First name should be set');
  assert.equal(get(model, 'lastName'), 'Doe', 'Last name should be set');
  assert.equal(get(model, 'lastName'), 'Doe', 'Last name should be set');
	assert.equal(get(model, 'createdAt'), created, 'Created at should be set');
	assert.equal(get(model, 'lastModifiedAt' ), modified, 'Modified at should be set');
});

test('should have an address relationship', function(assert) {
	assert.expect(4);

	const Person = this.store().modelFor('person');
	const relationships = get(Person, 'relationshipsByName');
	const address = relationships.get('address');

	assert.ok(address.isRelationship, 'should have a relationship');
	assert.ok(address.options.async, 'should be an async relationship');
	assert.equal(address.key, 'address', 'has a relationship to address');
	assert.equal(address.kind, 'belongsTo', 'address should belong to person');
});

test('default values should be set', function(assert) {
	assert.expect(2);

	const model = this.subject({
		firstName: 'Jane',
		lastName: 'Doe',
		age: 22
	});

	assert.ok(get(model, 'createdAt') instanceof Date, 'createdAt should have a default Date object');
	assert.ok(get(model, 'lastModifiedAt') instanceof Date, 'lastModifiedAt should have a default Date object');
});

test('computed properties should work', function(assert) {
	const model = this.subject({
		firstName: 'Jane',
		lastName: 'Doe',
		age: 22
	});

	assert.equal(get(model, 'fullName'), 'Jane Doe', 'Full name should be computed');
});
