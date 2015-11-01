/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'front-end',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

		contentSecurityPolicy: {
			'connect-src': "'self'",
			'script-src': "'self'"
		}
  };

	const hosts = [
		'localhost',
		'0.0.0.0',
		'127.0.0.1'
	];

	hosts.forEach(host => {
		ENV.contentSecurityPolicy['connect-src'] += ` ${host}:49152/* ${host}:4200/* ${host}:3000/* *`;
		ENV.contentSecurityPolicy['script-src'] += ` ${host}:49152/* ${host}:4200/* ${host}:3000/* *`;
		ENV.contentSecurityPolicy['style-src'] += ` ${host}:49152/* ${host}:4200/* ${host}:3000/* *`;
		ENV.contentSecurityPolicy['image-src'] += ` ${host}:49152/* ${host}:4200/* ${host}:3000/* *`;
		ENV.contentSecurityPolicy['default-src'] += ` ${host}:49152/* ${host}:4200/* ${host}:3000/* *`;
	});

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
