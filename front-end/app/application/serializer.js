import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
	keyForAttribute
});

/**
 * Our backend expects camelCase, not dash-erized.
 * @public
 * @memberOf {Application.Serializer}
 * @param {String} attr
 * @return {String}
 */
function keyForAttribute(attr) {
	return Ember.String.camelize(attr);
}
