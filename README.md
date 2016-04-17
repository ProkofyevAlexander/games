# Games

## Install

1. Install Node.js and npm

```sh
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Install Gulp and Bower
```sh
npm install gulp bower -g
```

3. Clone project from GitHub
```sh
git clone https://github.com/ProkofyevAlexander/games.git
```

## Run and stop

### Gulp tasks

Run in background for development purposes (Gulp is watching for files
changes and handle these on the fly).

```sh
gulp
```

Ctrl+C to stop process.

Prepare public files on production

```sh
gulp prepare_public
```

### Node.js server

```sh
sudo -E su
export EXPRESS_HOST=<your_domain>
npm start
```

Ctrl+C to stop process.

For run server as background process use:

```sh
nohup npm start &
```

For kill background process:

```sh
ps -a
  PID TTY          TIME CMD
 5936 pts/0    00:00:00 sudo
 5937 pts/0    00:00:00 su
 5938 pts/0    00:00:00 bash
 5958 pts/0    00:00:00 npm
 5967 pts/0    00:00:00 sh
 5968 pts/0    00:00:01 node
 5969 pts/0    00:00:00 node
 6058 pts/0    00:00:00 ps
kill -9 5968
```