# emberloop
EmberJS and Loopback using the JSON API

# Prerequisites
This project requires the Docker Compose be installed locally on your machine. For details on installing this, please visit https://docs.docker.com/compose/install

# Starting The Project
First, you need to clone the repository onto your machine:

```
git clone https://github.com/tsteuwer/emberloop.git
```
Enter the newly created folder `emberloop` and start the docker containers

```
cd emberloop
docker-compose up
```

# Troubleshooting
*Failed to watch or "inotify watches reached!"*

If you receive issues on linux about inotify limits reach, please read this thread: http://unix.stackexchange.com/a/13757
