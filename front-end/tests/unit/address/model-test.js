import { moduleForModel, test } from 'ember-qunit';

moduleForModel('address', 'Unit | Model | address', {
  // Specify the other units that are required for this test.
	needs: ['model:person']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
