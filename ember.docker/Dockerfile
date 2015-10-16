FROM node:4.2.1

MAINTAINER Troy Steuwer <tsteuwer@gmail.com> 

EXPOSE 4200
EXPOSE 35729

RUN npm install -g gulp
RUN npm install -g bower
RUN npm install -g phantomjs
RUN npm install -g ember-cli

# install watchman
RUN \
	git clone https://github.com/facebook/watchman.git &&\
	cd watchman &&\
	git checkout v3.5.0 &&\
	./autogen.sh &&\
	./configure &&\
	make &&\
	make install

