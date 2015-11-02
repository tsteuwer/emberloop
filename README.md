# emberloop
EmberJS and Loopback using the [JSON API Component for Loopback](https://github.com/digitalsadhu/loopback-component-jsonapi).

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/tsteuwer/emberloop?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Build Status](https://travis-ci.org/tsteuwer/emberloop.svg?branch=master)](https://travis-ci.org/tsteuwer/emberloop)

## Prerequisites
This project requires the Docker Compose be installed locally on your machine. For details on installing this, please visit https://docs.docker.com/compose/install

## Starting The Project
First, you need to clone the repository onto your machine:

```
git clone https://github.com/tsteuwer/emberloop.git
```
Enter the newly created folder `emberloop` and start the docker containers

```
cd emberloop
docker-compose up
```

Once all the containers have finished installing their dependencies and are up and running, you can visit the following URLs to view ember and loopback:

Ember site: http://localhost:4200

Loopback explorer: http://localhost:3000/explorer

API lives at: http://localhost:3000/api

## Interacting With Containers

There's a `/bin` folder which supplies various functions for linux users. To run them, go to the main `emberloop` directory and type the following in your terminal:

### EmberJS

To run specific Ember CLI commands, simply call `./bin/ember` followed by your function and arguments.

```
/**
 * Examples: They will be placed in the appropriate directory in /front-end/
 */

// Generate a new route
./bin/ember generate route people

// Generate a new model
./bin/ember generate model user

// Generate an adapter (Note: short hands can still be used)
./bin/ember g adapter user

// Destroy a previously generated model
./bin/ember destroy model user
```

### Loopback

You have access to run any loopback command to create models, datasources, et al via `./bin/slc`:

```
/**
 * Examples: They will be placed in the appropriate directory in /back-end/
 */

// Generate a new model
./bin/slc loopback:model people

// Generate a new datasource
./bin/slc loopback:datasource mysql
```

### NPM

There are two separate npm scripts. One that runs in the front-end (Ember) and back-end (Loopback) containers. Each one will update the `package.json` file in its appropriate folder.

```
// This will run npm on the frontend container with ember
./bin/npm-frontend install -g whatever

// This will run npm on the backend container with loopback
./bin/npm-backend install -g whatever
```

### Bower

To run Bower commands with the Ember container, use `./bin/bower`.

```
/**
 * Examples: They will be placed in the appropriate directory in /front-end/
 */

// Generate a new route
./bin/bower install --save-dev es6-javascript-validators

./bin/bower install --save phantomjs
```

### Gulp

To run Gulp commands with the Ember container, use `./bin/gulp`.

```
// Run a gulp task 
./bin/gulp myGulpTask
```

### Mine

This function changes all the permissions so that you can overwrite them. The ember commands seem to require this function because of the way it's ran in the container. Simply run this after generating a model if you run into any permission issues.

```
// Change ember files to be your own 
./bin/mine
```

# Troubleshooting
*Failed to watch or "inotify watches reached!"*

If you receive issues on linux about inotify limits reach, please read this thread: http://unix.stackexchange.com/a/13757
