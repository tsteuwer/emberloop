FROM node:4.2.1

MAINTAINER Troy Steuwer <tsteuwer@gmail.com> 

#ember
EXPOSE 4200

#live reload
EXPOSE 35729
EXPOSE 49152

RUN npm install -q -g gulp 
RUN npm install -q -g bower
RUN npm install -q -g phantomjs
RUN npm install -q -g ember-cli@1.13.8

# install watchman
RUN \
	git clone https://github.com/facebook/watchman.git &&\
	cd watchman &&\
	git checkout v3.5.0 &&\
	./autogen.sh &&\
	./configure &&\
	make &&\
	make install

