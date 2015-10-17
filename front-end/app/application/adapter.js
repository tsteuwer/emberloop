import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
	/**
	 * Root of our api endpoint.
	 * @public
	 * @type {String}
	 */
	namespace: 'api',

	/**
	 * Short hand methods
	 */
	

	/**
	 * Returns the host name.
	 * @public
	 * @memberOf {Application.Adapter}
	 * @return {String}
	 */
	host: function() {
		return 'http://' + window.location.hostname + ':3000';
	}.property()
});
